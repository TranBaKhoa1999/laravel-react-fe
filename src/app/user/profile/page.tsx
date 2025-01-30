"use client"
import { useAuth } from "@/lib/auth";

export default function Profile() {
    const { user, error, isLoading } = useAuth();
    if (error) return <div>failed to load</div>
    if( isLoading ) return (
        <div className="flex items-center justify-center min-h-screen">
            <h2 className="text-3xl font-bold text-red-200">Loading.....</h2>
        </div>
    );

    return (
        <div className="flex items-center justify-center min-h-screen">
            <h2 className="text-3xl font-bold text-red-200">Hello {user?.name}</h2>
        </div>
    );
}
