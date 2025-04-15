import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/utils/mongodb";
import User from "@/models/user";
import bcrypt from "bcrypt";
// Only available in Next.js app directory (Edge runtime)
// import cookie from 'cookie'; // fallback for Pages directory or Node env


export const { handlers, signIn, signOut, auth } = NextAuth({
    secret: process.env.AUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                await connectDB();

                console.log('credentials : ' , credentials);

                if(!credentials.email || !credentials.password) {
                    return null
                }

                const user = await User.findOne({ email: credentials?.email });
                if (!user) throw new Error("User not found");

                const isValid = await bcrypt.compare(credentials?.password, user.password);
                if (!isValid) throw new Error("Invalid password");

                return {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                };
            },
        }),
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
    ],
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async jwt({ token, user }) {
            // Runs on first sign-in or token refresh
            console.log('token : ' , token)
            console.log('user : ' , user)
            if (user) {
                const dbUser = await User.findOne({ email: user.email });
                token.role = dbUser?.role || null; // important!
            }
            return token;
        },
        async session({ session , token}) {
            const sessionUser = await User.findOne({
                email: session.user.email
            })
            
            session.user.id = sessionUser._id.toString()
            session.user.role = token?.role || sessionUser.role

            console.log('session user : ' , session.user)
            
            return session;
        },
        async signIn({ profile, account, user }) {
            try {
                await connectDB();

                // Only run this logic for OAuth providers (e.g., Google)
                if (account?.provider === "google" && profile?.email) {
                    const userExists = await User.findOne({ email: profile.email });

                    if (!userExists) {
                        const user = new User({
                            name: profile.name.replace(" ", "").toLowerCase(),
                            email: profile.email,
                            image: profile.picture,
                            role: "user", // or some default like 'user'
                        });
                        await user.save();
                    }
                }

                return true;
            } catch (err) {
                console.error("Sign-in error:", err);
                return false;
            }
        }


    },
    pages: {
        signIn: "/sign-in",
    }
});
