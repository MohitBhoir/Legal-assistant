"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "",
        name: ""
    });

    const [message, setMessage] = useState("");
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();

        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (res.ok) {
            setMessage("Registration successful! Redirecting...");
            router.push("/sign-in");
        } else {
            setMessage(data.error || "Something went wrong");
        }
    };

    return (
        <div className="flex min-h-screen bg-blue-50 items-center justify-center px-4 py-10">
            <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-6 sm:p-10 border-l-4 border-[rgb(3,70,148)]">
                <h2 className="text-3xl font-bold text-[rgb(3,70,148)] mb-6 text-center">
                    Register
                </h2>

                <form onSubmit={handleRegister} className="space-y-4">
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            [e.target.name]: e.target.value
                        }))}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(3,70,148)]"
                    />

                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        required
                        value={formData.password}
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            [e.target.name]: e.target.value
                        }))}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(3,70,148)]"
                    />

                    <input
                        name="name"
                        type="text"
                        placeholder="Enter User Name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            [e.target.name]: e.target.value
                        }))}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(3,70,148)]"
                    />

                    <select
                        name="role"
                        value={formData.role}
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            [e.target.name]: e.target.value
                        }))}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(3,70,148)]"
                    >
                        <option value="">Select Role</option>
                        <option value="user">User</option>
                        <option value="lawyer">Lawyer</option>
                    </select>

                    <button
                        type="submit"
                        className="w-full bg-[rgb(3,70,148)] text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all duration-200 font-medium text-lg"
                    >
                        Register
                    </button>

                    {message && (
                        <p className="text-center mt-4 text-sm text-green-600">{message}</p>
                    )}
                    <div className='text-md flex sm:flex-row gap-2 flex-col justify-center flex-wrap items-center'>
                        <p className="text-center">Already have an Account ?</p>
                        <Link className='hover:text-gray-700 hover:underline' href={'/sign-in'}>Sign In</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
