import { AppSidebar, AuthLayout, Container, Header } from '@/components';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { cookies } from 'next/headers';

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const cookieStore = await cookies();
    const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';
    return (
        <AuthLayout>
            <SidebarProvider defaultOpen={defaultOpen}>
                <Header>
                    <Container size="lg" className="flex justify-between">
                        <div className="flex gap-2 items-center">
                            <SidebarTrigger></SidebarTrigger>
                            <Header.Logo />
                        </div>
                        <div className="flex gap-2">
                            <Header.Dropdown />
                        </div>
                    </Container>
                </Header>
                <AppSidebar />
                {children}
            </SidebarProvider>
        </AuthLayout>
    );
}
