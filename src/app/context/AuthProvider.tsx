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

    useEffect(() => {
        if (!isLoading) {
            setAuthState(user);
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
