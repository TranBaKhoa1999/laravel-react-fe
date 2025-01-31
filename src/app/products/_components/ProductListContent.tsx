"use client";

import { useProducts } from "@/services/ProductService";
import { Product } from "@/types/Product";
import ProductCard from "./ProductCard";
import { useEffect } from "react";

export default function ProductListContent({ limit, currentPage, onTotalPagesChange }: { limit: number, currentPage: number, onTotalPagesChange: (total: number) => void }) {
    // const [products, setProducts] = useState<Product[]>([]);

    const { products, meta, error, isLoading } = useProducts(limit, currentPage);

    // Cập nhật số totalPages khi có dữ liệu mới từ API
    useEffect(() => {
        if (meta?.last_page) {
            onTotalPagesChange(meta.last_page);
        }
    }, [meta, onTotalPagesChange]);

    if (isLoading) return <p className="text-3xl font-bold text-red-200">Loading...</p>;
    if (error) return <p className="text-3xl font-bold text-red-500">Error</p>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
            {products?.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>

    );
}