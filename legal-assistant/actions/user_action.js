"use server";
import { connectToDB } from "@/utils/mongodb";
import User from "@/models/user";

export async function createUser(user) {
  try {
    await connectToDB();
    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
}
