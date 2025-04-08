import { AuthLayout, Container, Header } from '@/components';

export default function BoardsPage() {
    return (
        <AuthLayout>
            <Header>
                <Container size="lg" className="flex justify-between">
                    <Header.Logo />
                    <div className="flex gap-2">
                        <Header.Dropdown />
                    </div>
                </Container>
            </Header>
            <h1>Boards</h1>
        </AuthLayout>
    );
}
