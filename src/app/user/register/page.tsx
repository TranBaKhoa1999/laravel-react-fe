import RegisterForm from "@/components/user/RegisterForm";

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
