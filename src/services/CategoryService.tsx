import axios from '@/lib/axios'
import { ApiResponse } from '@/types/ApiResponse';
import { Category } from '@/types/Category';
import useSWR from 'swr';

export const useCategories = () => {
    const linkApi = process.env.NEXT_PUBLIC_BACKEND_API_PREFIX + "/categories";
    const fetchCategories = () => axios.get<ApiResponse>(linkApi).then((response) => response.data.data);
    const { data: categories, error, isLoading } = useSWR<Category[]>(linkApi, fetchCategories);
    return {
        categories,
        error,
        isLoading
    }
}