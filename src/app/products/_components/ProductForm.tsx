"use client";

import { useState } from "react";
import { createProduct, updateProduct } from "@/services/ProductService";
import { Product } from "@/types/Product";
import { useRouter } from "next/navigation";

export default function ProductForm({ product }: { product?: Product }) {
  const [formData, setFormData] = useState<Partial<Product>>(product || {});
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (product) {
        await updateProduct(product.id, formData);
      } else {
        await createProduct(formData);
      }
      router.push("/products");
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Tên sản phẩm"
        value={formData.name || ""}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="border p-2 w-full"
      />
      <textarea
        placeholder="Mô tả sản phẩm"
        value={formData.description || ""}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="border p-2 w-full"
      />
      <input
        type="number"
        placeholder="Giá"
        value={formData.price || ""}
        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        {product ? "Cập nhật" : "Tạo mới"}
      </button>
    </form>
  );
}
