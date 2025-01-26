"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";

export default function LoginForm() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Email:", email);
        console.log("Password:", password);
    };

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md mx-auto"
        >
            <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
            <div className="mb-4">
                <label
                    htmlFor="email"
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-500"
                    required
                />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="password"
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-500"
                    required
                />
            </div>
            <button
                type="submit"
                className="bg-blue-600 text-white font-bold py-2 px-4 rounded w-full hover:bg-blue-700 transition"
            >
                Login
            </button>
            <p className="text-gray-500 text-sm mt-4 text-center">
                Don't have an account?{" "}
                <Link href={'/user/register'} className="text-blue-600 hover:underline">
                    Sign up
                </Link>
            </p>
        </form>
    );
}
