'use client';
import { SidebarProvider } from '@/components/ui/sidebar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const queryClient = new QueryClient();

    const handleChangeSidebarState = () => {
        setSidebarOpen(!!sidebarOpen);
    };

    return (
        <SessionProvider>
            <SidebarProvider
                defaultOpen={sidebarOpen}
                onOpenChange={handleChangeSidebarState}
            >
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </SidebarProvider>
        </SessionProvider>
    );
}
