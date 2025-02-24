import { create } from "zustand";
import { User } from "@/types/User";
import { persist } from "zustand/middleware";
import axios from '@/lib/axios'

interface AuthState {
    user: User | null;
    isLoading: boolean;
    fetchUser: () => void;
    setUser: (user: User) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isLoading: true,
            fetchUser: async () => { // fetch user from server if localStorage is empty
                if(localStorage.getItem('auth-user')){
                    return;
                }
                try {
                const res = await axios.get("/api/user");
                set({ user: res.data.data, isLoading: false });
                } catch (error) {
                set({ user: null, isLoading: false });
                }
            },
            setUser: (user) => set({ user, isLoading: false }),
            logout: () => set({ user: null }),
        }),
        {
            name: "auth-user",
        }
    )
);

if( typeof window !== 'undefined' ){
    useAuthStore.getState().fetchUser();
}
