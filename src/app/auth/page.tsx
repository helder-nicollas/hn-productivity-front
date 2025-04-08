import { AuthContainer, GuestLayout } from '@/components';
export default async function LoginPage() {
    return (
        <GuestLayout>
            <main className="min-h-screen justify-center flex items-center">
                <AuthContainer />
            </main>
        </GuestLayout>
    );
}
