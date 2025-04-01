import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String },
    image: { type: String },
    createdAt: { type: Date, default: Date.now },
});

// Ensure the model is only created once
const User = mongoose.models?.User || mongoose.model("User", UserSchema);

export default User;
