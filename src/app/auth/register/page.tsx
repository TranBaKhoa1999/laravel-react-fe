import RegisterForm from "@/components/auth/RegisterForm";

export const metadata = {
    title: 'Register',
};

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <RegisterForm />
        </div>
    );
}
