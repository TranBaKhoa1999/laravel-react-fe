import { Category } from "./Category";

export interface Product{
    id: number;
    name: string;
    slug: string;
    price: number;
    description: string;
    image: string;
    category: Category
    created_at?: string;
    updated_at?: string;
}