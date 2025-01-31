"use client";

import { Pagination } from "flowbite-react";
import { useEffect, useState } from "react";
import ProductListContent from "./products/_components/ProductListContent";

export default function ProductList() {
    // const [products, setProducts] = useState<Product[]>([]);

    const paginationLimits = [5, 10];
    const [limit, setLimit] = useState(paginationLimits[0]);

    // store limit in localStorage
    useEffect(() => {
        const storedLimit = localStorage.getItem('productsLimit');
        if (storedLimit) {
            setLimit(Number(storedLimit));
        }
    }, []);

    const [currentPage, setCurrentPage] = useState(1);

    const [totalPages, setTotalPages] = useState(1);

    const handleLimitChange = (newLimit: number) => {
        setLimit(newLimit);
        localStorage.setItem('productsLimit', String(newLimit)) // store limit in localStorage
        setCurrentPage(1); // Reset to first page
    };
    
    return (
        <div className="flex flex-col min-h-content">
            <div className="flex-grow">
                {/* Control limit */}
                <div className="flex justify-end p-4">
                    <select
                        value={limit}
                        onChange={(e) => handleLimitChange(Number(e.target.value))}
                        className="border p-2"
                    >
                        {paginationLimits.map((limitValue) => (
                            <option key={limitValue} value={limitValue}>{limitValue} items</option>
                        ))}
                    </select>
                </div>

                <ProductListContent currentPage={currentPage} limit={limit} onTotalPagesChange={setTotalPages} />
            </div>


            {/* Pagination */}
            <div className="flex justify-center p-4 ">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages} // Luôn cập nhật từ API
                    onPageChange={setCurrentPage}
                    showIcons
                />
            </div>
        </div>
    );
}