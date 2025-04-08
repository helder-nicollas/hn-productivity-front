import { Search, Pencil, ListCheck } from 'lucide-react';
import { headers } from 'next/headers';
import {
    Sidebar as UISidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
} from '../ui/sidebar';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import Link from 'next/link';

async function Sidebar() {
    const headersList = await headers();

    const pathname = headersList.get('referer')?.split('application')[1] || '';

    return (
        <UISidebar>
            <SidebarHeader className="mt-20 flex gap-10 justify-center flex-row">
                <Button
                    size="xl"
                    className="w-16"
                    variant={
                        pathname.includes('boards') ? 'default' : 'outline'
                    }
                    title="Suas listas de tarefas"
                    asChild
                >
                    <Link href="/application/boards">
                        <ListCheck className="size-6" />
                    </Link>
                </Button>
                <Button
                    size="xl"
                    className="w-16"
                    variant={pathname.includes('notes') ? 'default' : 'outline'}
                    title="Suas anotações"
                    asChild
                >
                    <Link href="/application/notes">
                        <Pencil className="size-6" />
                    </Link>
                </Button>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Seus Boards</SidebarGroupLabel>
                    <div className="relative">
                        <Input
                            placeholder="Pesquisar board..."
                            className="mb-3 mt-1 h-10"
                        />
                        <Search className="absolute top-[14px] opacity-50 size-5 right-2" />
                    </div>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {/* {items.map(item => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))} */}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </UISidebar>
    );
}

export { Sidebar };
