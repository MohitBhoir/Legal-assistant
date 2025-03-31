import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/utils/mongodb";
import User from "@/models/user";


export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
    ],
    // adapter: MongoDBAdapter(clientPromise), // Uses MongoDB as the database for NextAuth
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user.email
            })
            
            session.user.id = sessionUser._id.toString()
            console.log(session , session.user);
            
            return session;
        },
        async signIn({ profile }) {
            // this funtion returns true(in case of success) / false(in case of failure)
    
            // these are serverless functions -> basically they are lambda function which when called spins up a server every time and connects to the database
            try {
                await connectDB()
                // chaeck if the user already exists
                const userExists = await User.findOne({email: profile.email})
    
                // if not create a new user in db
                if (!userExists) {
                    const user = new User({
                        username: profile.name.replace(" " , "").toLowerCase(),
                        email: profile.email,
                        image: profile.picture
                    })
                    await user.save()
                }
                return true;
            } catch (err) {
                console.log(err.message);
                return false            
            }
        }
    }
});
