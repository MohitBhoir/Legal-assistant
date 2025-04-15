"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();

        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (res.error) {
            setError(res.error);
        } else {
            router.push("/"); // replace with your route
        }
    };

    return (
        <div className="flex min-h-screen bg-blue-50 items-center justify-center px-4 py-10">
            <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-6 sm:p-10 border-l-4 border-[rgb(3,70,148)]">
                <h2 className="text-3xl font-bold text-[rgb(3,70,148)] mb-6 text-center">
                    Login
                </h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(3,70,148)]"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(3,70,148)]"
                    />

                    <button
                        type="submit"
                        className="w-full bg-[rgb(3,70,148)] text-white px-4 py-2 rounded-lg hover:opacity-90 transition-all duration-200 font-medium text-lg"
                    >
                        Login
                    </button>

                    {error && (
                        <p className="text-center text-red-600 text-sm">{error}</p>
                    )}

                    <button
                        type="button"
                        onClick={() => signIn("google", { callbackUrl: "/" })}
                        className="w-full mt-4 bg-gray-100 text-[rgb(3,70,148)] border border-[rgb(3,70,148)] px-4 py-2 rounded-lg hover:bg-blue-100 transition-all duration-200 font-medium"
                    >
                        Login with Google
                    </button>
                </form>
            </div>
        </div>
    );
}
