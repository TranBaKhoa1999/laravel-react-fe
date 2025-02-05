
import { Metadata } from "next";
export async function generateMetadata({
    params,
}: {
    params: { category_slug: string};
}): Promise<Metadata> {
    const { category_slug } = await params;
    return {
        title: category_slug,
    };
}

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

    return (
        <>
            {children}
        </>
    );
}