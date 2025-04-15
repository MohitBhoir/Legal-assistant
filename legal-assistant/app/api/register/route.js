import { connectDB } from "@/utils/mongodb.js";
import User from "@/models/user";
import bcrypt from "bcrypt";

export async function POST(req) {
    try {
        const { email, password, role, name } = await req.json();

        if (!email || !password || !role) {
            return new Response(JSON.stringify({ error: "Missing fields" }), {
                status: 400,
            });
        }

        await connectDB();

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return new Response(JSON.stringify({ error: "User already exists" }), {
                status: 409,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: hashedPassword,
            role,
            name
        });

        await newUser.save();

        return new Response(JSON.stringify({ message: "User created successfully" }), {
            status: 201,
        });
    } catch (error) {
        console.error("Register Error:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
        });
    }
}
