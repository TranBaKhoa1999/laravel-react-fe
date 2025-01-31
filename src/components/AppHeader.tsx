"use client"

import { usePathname } from "next/navigation";
import { NavBarFlowbite } from "./NavBar";
import AuthHeader from "./auth/AuthHeader";

export default function Header() {
    const pathname = usePathname();

    const isUserAuth = pathname?.match("/auth/login") || pathname?.match("/auth/register");

    return (
        <>
            {isUserAuth ?
                <AuthHeader />
                :
                (
                    <header className='bg-blue-600 '>
                        <NavBarFlowbite />
                    </header>
                )
            }
        </>
    );
}
