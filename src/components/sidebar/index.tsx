'use client';
import { Pencil, ListCheck } from 'lucide-react';
import { Sidebar as UISidebar, SidebarHeader } from '../ui/sidebar';
import { Button } from '../ui/button';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

type SidebarProps = {
    children: ReactNode;
};

function Sidebar({ children }: SidebarProps) {
    const pathname = usePathname();
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
            {children}
        </UISidebar>
    );
}

export { Sidebar };
