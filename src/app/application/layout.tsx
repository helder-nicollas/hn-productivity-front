import {
    AuthLayout,
    CreateBoard,
    Header,
    Sidebar,
    SidebarBoardsList,
    SidebarBoardsListSkeleton,
} from '@/components';
import { Input } from '@/components/ui/input';
import {
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import { Search } from 'lucide-react';
import { cookies } from 'next/headers';
import { Suspense } from 'react';

export default async function AppLayout({
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
                <Sidebar>
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupLabel className="text-base relative top-1">
                                Seus Boards
                            </SidebarGroupLabel>
                            <CreateBoard />
                            <SidebarGroupContent className="mt-5">
                                <div className="relative">
                                    <Input
                                        placeholder="Pesquisar board..."
                                        className="mb-3 h-10"
                                    />
                                    <Search className="absolute top-[10px] opacity-50 size-5 right-2" />
                                </div>
                                <SidebarMenu>
                                    <Suspense
                                        fallback={<SidebarBoardsListSkeleton />}
                                    >
                                        <SidebarBoardsList />
                                    </Suspense>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>
                {children}
            </SidebarProvider>
        </AuthLayout>
    );
}
