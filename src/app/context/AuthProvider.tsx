"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { User } from "@/types/User";

interface AuthContextType {
    user: User | null;
    error: any;
    csrf: any;
    register: any;
    login: any;
    logout: any;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const { user, csrf, register, login, logout, error, isLoading } = useAuth();

    const [authState, setAuthState] = useState<User | null>(user);
    // const [loading, setLoading] = useState(true); // Đợi lấy dữ liệu từ localStorage

    // Khôi phục user từ localStorage khi tải trang
    // useEffect(() => {
    //     const storedUser = localStorage.getItem("auth-user");
    //     if (storedUser) {
    //         setAuthState(JSON.parse(storedUser));
    //     }
    //     setLoading(false); // Đánh dấu đã lấy xong dữ liệu
    // }, []);

    useEffect(() => {
        if (!isLoading) {
            setAuthState(user);
            if (user) {
                // console.log('alo');
                // localStorage.setItem("auth-user", JSON.stringify(user));
            } else {
                localStorage.removeItem("auth-user");
            }
        }
    }, [user, error, isLoading]);

    return (
        <AuthContext.Provider value={{ user: authState, csrf, register, login, logout, isLoading, error }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
}
