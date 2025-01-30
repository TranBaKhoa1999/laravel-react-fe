import { Product } from "@/types/Product";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
      <h2 className="text-xl font-semibold">{product.name}</h2>
      <p className="text-gray-600">{product.price} VND</p>
      <Link href={`/products/${product.id}`} className="text-blue-500">
        Xem chi tiết
      </Link>
    </div>
  );
}