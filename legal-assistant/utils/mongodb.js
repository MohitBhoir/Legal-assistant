import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI

let isConnected = false; // Prevent multiple connections

export const connectDB = async () => {
    if (isConnected) return;
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true;
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
    }
};
