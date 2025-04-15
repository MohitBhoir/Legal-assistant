import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String },
    createdAt: { type: Date, default: Date.now },
    role: {
        type: String,
        default: ''
    }
});

// Ensure the model is only created once
const User = mongoose.models?.User || mongoose.model("User", UserSchema);

export default User;
