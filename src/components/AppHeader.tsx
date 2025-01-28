"use client"
import { useState } from "react";
import { useAuth } from "@/hooks/auth"; // Import hook useAuth

import Link from "next/link";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const { user, logout } = useAuth(); // Lấy trạng thái user và hàm logout từ useAuth

     // Hàm xử lý logout
     const handleLogout = async () => {
        await logout();
    };

    return (
        <header className="bg-blue-600 text-white">
            <div className="container mx-auto p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold"><Link href={'/'}>My Website</Link></h1>
                <button
                    className="md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    ☰
                </button>
                <nav
                    className={`${isOpen ? "block" : "hidden"
                        } md:block`}
                >
                    <ul className="flex flex-col md:flex-row gap-4">
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href={'/about'}>About</Link>
                        </li>
                        <li>
                            <Link href={'/contact'}>Contact</Link>
                        </li>
                         {/* check if user logged in */}
                        {user ? (
                            <li>
                                <button onClick={handleLogout} >
                                    Logout
                                </button>
                            </li>
                        ) : (
                            <li>
                                <Link href="/user/login" >
                                    Login
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
}
