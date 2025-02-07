import axios from "@/lib/axios";
import { Product } from "@/types/Product";
import { Metadata } from "next";

const getProductBySlug = async (category_slug: string, product_slug: string): Promise<Product> => {
    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API_PREFIX}/products/${category_slug}/${product_slug}`
    );
    return response.data.data;
};

// handle dynamic metadata for each prodduct
// generateMetadata dùng để lấy metadata cho từng sản phẩm
export async function generateMetadata({
    params,
}: {
    params: { category_slug: string; product_slug: string };
}): Promise<Metadata> {
    const { category_slug, product_slug } = await params;
    const product = await getProductBySlug(category_slug, product_slug);

    // Nếu không có sản phẩm, trả về metadata mặc định
    if (!product) {
        return {
            title: 'Sản phẩm không tìm thấy',
            description: 'Không có sản phẩm nào phù hợp với yêu cầu của bạn.',
        };
    }

    // Trả về metadata cho sản phẩm cụ thể
    return {
        title: `${product.name} - ${product.category.name}`,
        description: product.description || 'Thông tin chi tiết sản phẩm.',
        openGraph: {
            title: `${product.name} - ${product.category.name}`,
            description: product.description || 'Thông tin chi tiết sản phẩm.',
            images: [
                {
                    url: product.image || '/default-product.jpg',
                    alt: product.name,
                },
            ],
            url: `/products/${category_slug}/${product_slug}`,
        },
        twitter: {
            card: 'summary_large_image',
            title: `${product.name} - ${product.category.name}`,
            description: product.description || 'Thông tin chi tiết sản phẩm.',
            // image: product.image || '/default-product.jpg',
        },
    };
}

export default function ProductDetailLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
        </>
    );
}