import { AuthLayout, Header, Sidebar } from '@/components';
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
                    <div className="flex justify-between w-full pl-3 pr-5">
                        <div className="flex gap-2 items-center">
                            <SidebarTrigger variant="ghost"></SidebarTrigger>
                            <Header.Logo />
                        </div>
                        <div className="flex gap-2">
                            <Header.Dropdown />
                        </div>
                    </div>
                </Header>
                <Sidebar />
                {children}
            </SidebarProvider>
        </AuthLayout>
    );
}
