'use client';
import { Product } from "@/types/Product";
import Link from "next/link";
import ImageWithFallback from "@/components/ImageWithFallBack";
import { useState } from "react";
import ProductModal from "./ProductModal";

export default function ProductCard({ product }: { product: Product }) {
    const [selectedProduct, setSelectedProduct] = useState(product);
    const [showModal, setShowModal] = useState(false);
    return (
        <div className="border p-4 rounded-lg shadow-md">
            <ImageWithFallback src={product.image} alt={product.name} className="w-full h-40 object-cover" width={500} height={500} />
            <h2 className="text-xl font-semibold">
                <Link href={`/products/${product.id}`} className="">
                    {product.name}
                </Link>
            </h2>
            <p className="text-gray-600">{product.price} VND</p>
            <div className="flex justify-between">
                <Link href='' className="mt-2 px-4 py-2 bg-blue-500 text-white rounded m-2" onClick={() => setShowModal(true)}>
                    View
                </Link>
            </div>

            <ProductModal product={selectedProduct} onClose={() => void (setShowModal(false))} showModal={showModal} />
        </div>
    );
}