"use client";

import ImageWithFallback from "@/components/ImageWithFallBack";
import { useProductById } from "@/services/ProductService";
import { Product } from "@/types/Product";
import { useParams } from "next/navigation";

export default function ProductDetail() {
    const params = useParams();
    // const { id } = router.query; // Lấy id từ query của URL

    const id = Number(params.id);
    const { product, error, isLoading } = useProductById(id);

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
            <h1 className="text-2xl font-bold">{product?.name}</h1>
            <ImageWithFallback src={product?.image} alt={product?.name} className="" width={500} height={500} />
            <p>{product?.description}</p>
            <p className="text-xl font-semibold">{product?.price} VND</p>
        </div>
    );
}
