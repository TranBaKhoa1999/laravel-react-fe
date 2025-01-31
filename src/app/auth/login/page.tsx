import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
    title: 'Login',
};

export default function Home() {
    return (
        <div className="flex items-center justify-center min-h-content_auth">
            <LoginForm />
        </div>
    );
}
