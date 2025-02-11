"use client"
import { useAuthContext } from "@/app/context/AuthProvider";
import { useAuthStore } from "@/app/storage/AuthStorage";

export default function Profile() {
    // const { user, error, isLoading } = useAuthContext();
    const { user, isLoading} = useAuthStore();
    if( isLoading ) return (
        <div className="flex items-center justify-center min-h-content">
            <h2 className="text-3xl font-bold text-red-200">Loading.....</h2>
        </div>
    );

    return (
        <div className="flex items-center justify-center min-h-content">
            <h2 className="text-3xl font-bold text-red-200">Hello {user?.name}</h2>
        </div>
    );
}
