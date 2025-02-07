import CategorySidebar from "@/components/CategorySideBar";

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex">
            {/* Sidebar chỉ có trên danh sách sản phẩm và danh mục */}
            <CategorySidebar />
            <main className="flex-grow">{children}</main>
        </div>
    );
}