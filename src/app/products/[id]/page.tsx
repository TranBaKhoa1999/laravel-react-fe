import { getProductById } from "@/services/ProductService";
import { Product } from "@/types/Product";

export default async function ProductDetail({ params }: { params: { id: string } }) {
  const product: Product = await getProductById(Number(params.id));

  return (
    <div>
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <img src={product.image} alt={product.name} className="w-full h-60 object-cover" />
      <p>{product.description}</p>
      <p className="text-xl font-semibold">{product.price} VND</p>
    </div>
  );
}
