import { create } from "zustand";
import { User } from "@/types/User";
import { persist } from "zustand/middleware";

interface AuthState {
    user: User | null;
    isLoading: boolean;
    setUser: (user: User) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isLoading: true,
            setUser: (user) => set({ user, isLoading: false }),
            logout: () => set({ user: null }),
        }),
        {
            name: "auth-storage",
        }
    )
);
