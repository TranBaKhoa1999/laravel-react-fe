"use client";

import { usePathname } from "next/navigation";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Kiểm tra nếu route bắt đầu với "/user"
    const isUserAuth = pathname?.match("/auth/login") || pathname?.match("/auth/register");

    return (
        <>
            {!isUserAuth && <AppHeader />}
            <main>
                {children}
            </main>
            {!isUserAuth && <AppFooter />}
        </>
    );
}
