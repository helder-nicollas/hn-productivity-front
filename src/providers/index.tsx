'use client';
import { SidebarProvider } from '@/components/ui/sidebar';
import { SessionProvider } from 'next-auth/react';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const handleChangeSidebarState = () => {
        setSidebarOpen(!!sidebarOpen);
    };

    return (
        <SessionProvider>
            <SidebarProvider
                defaultOpen={sidebarOpen}
                onOpenChange={handleChangeSidebarState}
            >
                {children}
            </SidebarProvider>
        </SessionProvider>
    );
}
