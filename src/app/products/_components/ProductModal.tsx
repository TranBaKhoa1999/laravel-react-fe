import ImageWithFallback from "@/components/ImageWithFallBack";

export default function ProductModal({ product, onClose, showModal }: { product: any; onClose: () => void , showModal: boolean}) {
    if (!product) return null; // Nếu chưa có sản phẩm, không render gì cả

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${showModal ? '' : ' hidden'}`}>
            <div className="bg-white p-5 rounded-lg w-96">
                <h2 className="text-xl font-bold">{product.name}</h2>
                <ImageWithFallback src={product.image} alt={product.name} className="w-full h-40 object-cover my-3" width={390} height={380}/>
                <p>{product.description}</p>
                <p className="text-red-500 font-semibold">{product.price} VND</p>
                <button className="mt-4 px-4 py-2 bg-gray-500 text-white rounded" onClick={onClose}>
                    Đóng
                </button>
            </div>
        </div>
    );
}
