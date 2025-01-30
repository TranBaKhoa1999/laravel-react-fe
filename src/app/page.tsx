"use client";

import { useProducts } from "@/services/ProductService";
import { Product } from "@/types/Product";
import ProductCard from "./products/_components/ProductCard";

export default function ProductList() {
    // const [products, setProducts] = useState<Product[]>([]);

     const { products, error, isLoading } = useProducts(5, 1);
    if (error) return (
        <div className="flex items-center justify-center min-h-screen">
            <h2 className="text-3xl font-bold text-red-200">Loading.....</h2>
        </div>
    );

    if (isLoading) return (
        <div className="flex items-center justify-center min-h-screen">
            <h2 className="text-3xl font-bold text-red-200">Loading.....</h2>
        </div>
    );

    return (
        <div className="min-h-screen">
        <div className="flex flex-col flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
            {products?.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    </div>
    );
}