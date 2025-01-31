const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        // './components/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
        // './pages/**/*.{js,ts,jsx,tsx,mdx}',
        // './components/**/*.{js,ts,jsx,tsx,mdx}',

        // // Or if using `src` directory:
        './src/**/*.{js,ts,jsx,tsx,mdx}',
        flowbite.content(),
    ],
    theme: {
        extend: {
            height: {
                footer: "87.98px", // Định nghĩa chiều cao header
                header: "66.48px", // Định nghĩa chiều cao footer
                header_auth: "63.98px", // Định nghĩa chiều cao header auth
            },
            minHeight: {
                content: "calc(100vh - theme(height.header) - theme(height.footer))",
                content_auth: "calc(100vh - theme(height.header_auth) - theme(height.footer))",
            },
        },
    },
    plugins: [
        flowbite.plugin(),
    ],
}