'use client';
import {
    Calendar,
    Home,
    Inbox,
    Search,
    Settings,
    NotepadTextIcon,
} from 'lucide-react';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '../ui/sidebar';
import { Button } from '../ui/button';
import { useCallback, useState } from 'react';
import { Input } from '../ui/input';

const items = [
    {
        title: 'Home',
        url: '#',
        icon: Home,
    },
    {
        title: 'Inbox',
        url: '#',
        icon: Inbox,
    },
    {
        title: 'Calendar',
        url: '#',
        icon: Calendar,
    },
    {
        title: 'Search',
        url: '#',
        icon: Search,
    },
    {
        title: 'Settings',
        url: '#',
        icon: Settings,
    },
];

type Tabs = 'notes' | 'boards';

function AppSidebar() {
    const [selected, setSelected] = useState<Tabs>('boards');

    const handleChangeState = useCallback((tab: Tabs) => {
        setSelected(tab);
    }, []);

    return (
        <Sidebar>
            <SidebarHeader className="mt-20 flex gap-10 justify-center flex-row">
                <Button
                    size="xl"
                    className="w-16"
                    variant={selected == 'boards' ? 'default' : 'outline'}
                    onClick={() => handleChangeState('boards')}
                >
                    <Calendar className="size-6" />
                </Button>
                <Button
                    size="xl"
                    className="w-16"
                    variant={selected == 'notes' ? 'default' : 'outline'}
                    onClick={() => handleChangeState('notes')}
                >
                    <NotepadTextIcon className="size-6" />
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
                            {items.map(item => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}

export { AppSidebar };
