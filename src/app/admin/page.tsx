'use client';

import { useAuth } from "@/lib/auth";
import { useAuthContext } from "../context/AuthProvider";
import { useAuthStore } from "../storage/AuthStorage";

export default function dashboard() {
    // const [products, setProducts] = useState<Product[]>([]);
    // const { user, error, isLoading } = useAuth();
    // const { user, error, isLoading } = useAuthContext();
    const { user, isLoading } = useAuthStore();
    console.log(user);
    
    // if (error) return <div>failed to load</div>

    if( isLoading ) return (
        <div className="flex items-center justify-center min-h-content">
            <h2 className="text-3xl font-bold text-red-200">Loading.....</h2>
        </div>
    );


    return (
        <div className="flex flex-col min-h-content">
            Hi, {user?.name}
        </div>
    );
}