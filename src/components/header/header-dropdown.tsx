'use client';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { PersonIcon } from '../icons';
import { signOut } from 'next-auth/react';
import { LogOut, Settings } from 'lucide-react';

function HeaderDropdown() {
    const handleSignOut = async () => {
        await signOut({
            callbackUrl: '/auth',
            redirect: true,
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <PersonIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-between cursor-pointer">
                    Configurações
                    <Settings />
                </DropdownMenuItem>
                <DropdownMenuItem
                    variant="destructive"
                    onClick={handleSignOut}
                    className="cursor-pointer justify-between"
                >
                    Logout
                    <LogOut />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export { HeaderDropdown };
