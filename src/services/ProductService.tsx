import axios from '@/lib/axios'
import { ApiResponse } from '@/types/ApiResponse';
import { Product } from '@/types/Product';
import useSWR from 'swr';

export const useProducts = (limit = 5, page = 1) => {
    const linkApi = process.env.NEXT_PUBLIC_BACKEND_API_PREFIX + "/products" + `?limit=${limit}&page=${page}`;
    const fetchProducts = () => axios.get<ApiResponse>(linkApi).then((response) => response.data.data);
    const { data, error, isLoading } = useSWR<ApiResponse>(linkApi, fetchProducts, {
        // Refetch when the data is stale (outdated)
        revalidateIfStale: true, // Refetch data when it's stale
        // Refetch when the page is focused again
        revalidateOnFocus: true, // Refetch when the user comes back to the page

        // Refetch when the network connection is restored
        revalidateOnReconnect: true, // Refetch when the user reconnects to the internet

        // Avoid duplicate requests for the same data within this interval (2000ms = 2 seconds)
        dedupingInterval: 60000, // Throttle requests to avoid duplicate fetches ( 1 minute)

        // Retry on error, 3 times is usually sufficient to handle transient issues
        shouldRetryOnError: true, // Retry on error
        errorRetryCount: 3, // Retry 3 times
        errorRetryInterval: 3000, // Retry every 3 seconds
    });
    return {
        products: data?.data ?? [],
        meta: data?.meta ?? null, // pagination
        error,
        isLoading
    }
};

export const useProductById = (id: number, initialData?: Product) => {
    const linkApi = process.env.NEXT_PUBLIC_BACKEND_API_PREFIX + "/products/" + id;
    const fetchProducts = () => axios.get<ApiResponse>(linkApi).then((response) => response.data.data);
    const { data: product, error, isLoading } = useSWR<Product>(linkApi, fetchProducts, {
        fallbackData: initialData,
        // Refetch when the data is stale (outdated)
        revalidateIfStale: false, // Refetch data when it's stale
        // Refetch when the page is focused again
        revalidateOnFocus: false, // Refetch when the user comes back to the page
        // Refetch when the network connection is restored
        revalidateOnReconnect: true, // Refetch when the user reconnects to the internet
    });
    return {
        product,
        error,
        isLoading
    }
};
// export const getProductById = async (id: number): Promise<Product> => {
//   const response = await axios.get(process.env.NEXT_PUBLIC_BACKEND_API_PREFIX + '/products/' + id);
//   return response.data.data;
// };

// export const createProduct = async (product: Partial<Product>) => {
//   const response = await axios.post("/api/products", product);
//   return response.data;
// };

// export const updateProduct = async (id: number, product: Partial<Product>) => {
//   const response = await axios.put(`/api/products/${id}`, product);
//   return response.data;
// };

// export const deleteProduct = async (id: number) => {
//   await axios.delete(`/api/products/${id}`);
// };