import axios from "@/lib/axios";
import { Product } from "@/types/Product";

const getProductById = async (id: number): Promise<Product> => {
    const response = await axios.get(process.env.NEXT_PUBLIC_BACKEND_API_PREFIX + '/products/' + id);
    return response.data.data;
};

// handle dynamic metadata for each prodduct
export async function generateMetadata({ params }: { params: { id: number } }) {
    const {id} = await params;
    const product = await getProductById(id);
    return {
        title: product?.name ?? 'Product Details',
        description: product?.description ?? 'No description available',
    };
}

export default function ProductDetailLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

    return (
        <>
            {children}
        </>
    );
}