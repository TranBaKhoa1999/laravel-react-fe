import Link from "next/link";

import AppFooter from "@/components/AppFooter";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <header className="bg-blue-600 text-white">
                <div className="container mx-auto p-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold"><Link href={'/'}>My Website</Link></h1>
                </div>
            </header>
            <main className="p-6">{children}</main>
            <AppFooter />
        </>
    );
}
