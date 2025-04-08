import { AuthContainer, Container, GuestLayout, Header } from '@/components';
export default async function LoginPage() {
    return (
        <GuestLayout>
            <Header>
                <Container size="lg" className="flex justify-between">
                    <Header.Logo />
                </Container>
            </Header>
            <main className="min-h-screen justify-center flex items-center">
                <AuthContainer />
            </main>
        </GuestLayout>
    );
}
