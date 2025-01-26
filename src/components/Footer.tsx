export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white">
            <div className="container mx-auto p-4 text-center">
                <p>© 2025 My Website. All rights reserved.</p>
                <div className="flex justify-center gap-4 mt-2">
                    <a href="https://facebook.com" className="hover:text-blue-400">Facebook</a>
                    <a href="https://twitter.com" className="hover:text-blue-400">Twitter</a>
                    <a href="https://linkedin.com" className="hover:text-blue-400">LinkedIn</a>
                </div>
            </div>
        </footer>
    );
}