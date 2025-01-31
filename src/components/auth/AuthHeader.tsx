import Link from "next/link";

export default function AuthHeader() {
    return (
        <header className="bg-blue-600 text-white">
            <div className="container mx-auto p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold"><Link href={'/'}>My Website</Link></h1>
            </div>
        </header>

    );
};