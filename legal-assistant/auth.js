import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
// import client from "@/utils/mongodb"
// import clientPromise from "@/lib/mongodb"; // If using MongoDB Atlas with NextAuth adapter

export const {handler , signIn , signOut , auth} = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
    ],
    // adapter: MongoDBAdapter(clientPromise), // Uses MongoDB as the database for NextAuth
    callbacks: {
        async signIn({ account , profile , user }) {
            await connectDB();
            console.log('account : ' + account)
            console.log('profile : ' + profile)
            console.log('user : ' + user)

            // Check if the user already exists in MongoDB
            const existingUser = await User.findOne({ email: user.email });

            if (!existingUser) {
                // If new user, store details in MongoDB
                const newUser = new User({
                    email: user.email,
                    name: user.name,
                    image: user.image,
                    createdAt: new Date(),
                });

                await newUser.save();
            }

            return true; // Allow sign-in
        },
        async session({ session, user }) {
            // Attach user ID to the session
            const dbUser = await User.findOne({ email: session.user.email });
            session.user.id = dbUser?._id;
            return session;
        },
    }
});
