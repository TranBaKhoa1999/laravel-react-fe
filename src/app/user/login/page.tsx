import LoginForm from "@/components/user/LoginForm";

export const metadata = {
    title: 'Login',
};

export default function Home() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <LoginForm />
        </div>
    );
}
