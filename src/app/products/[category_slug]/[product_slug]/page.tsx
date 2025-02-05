"use client";

import ImageWithFallback from "@/components/ImageWithFallBack";
import { useProductBySlug } from "@/services/ProductService";
import { useParams } from "next/navigation";

export default function ProductDetail() {
    const params = useParams();
    // const { id } = router.query; // Lấy id từ query của URL

    const category_slug = String(params.category_slug);
    const product_slug = String(params.product_slug);

    const { product, error, isLoading } = useProductBySlug(category_slug, product_slug);

    if (error) return (
        <div className="flex items-center justify-center min-h-content">
            <h2 className="text-3xl font-bold text-red-200">Loading.....</h2>
        </div>
    );

    if (isLoading) return (
        <div className="flex items-center justify-center min-h-content">
            <h2 className="text-3xl font-bold text-red-200">Loading.....</h2>
        </div>
    );

    return (
        <div className="min-h-content">
            <h1 className="text-2xl font-bold">{product?.name}</h1>
            <ImageWithFallback src={product?.image} alt={product?.name} className="" width={390} height={380} priority={true} />
            <p>{product?.description}</p>
            <p className="text-xl font-semibold">{product?.price} VND</p>
        </div>
    );
}
