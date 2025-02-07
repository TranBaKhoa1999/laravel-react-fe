"use client";

import Link from "next/link";
import { useCategories } from "@/services/CategoryService";
import { usePathname } from "next/navigation";

export default function CategorySidebar() {
    const {categories, error, isLoading} = useCategories();
    const pathName = usePathname();
    const activeCategory = pathName.split("/")[2];
    // const [categories, setCategories] = useState<Category[]>([]);

    if (isLoading) return <p className="text-3xl font-bold text-red-200">Loading...</p>;
    if (error) return <p className="text-3xl font-bold text-red-500">Error</p>;

    return (
        <div className="flex flex-col p-4 border-r">
            <h2 className="text-xl font-bold mb-4">Categories</h2>
            <ul>
                {categories?.map((category) => (
                    <li key={category.id}>
                        <Link href={`/products/${category.slug}`}>
                            <span className={`block p-2 rounded ${activeCategory === category.slug ? "bg-blue-500 text-white" : ""}`}>
                                {category.name}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
