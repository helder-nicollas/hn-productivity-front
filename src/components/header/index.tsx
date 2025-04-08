import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';

type HeaderProps = ComponentProps<'header'>;
export function Header({ className, ...props }: HeaderProps) {
    return (
        <header
            {...props}
            className={cn(
                'py-4 border-b fixed w-full top-0 px-2 shadow-md z-20',
                className,
            )}
        >
            <div className="container mx-auto flex justify-between">
                <h1 className="text-2xl font-bold">Hn Productivity</h1>
                <div className="flex gap-2">
                    <Button asChild>
                        <Link href="/auth">Entrar</Link>
                    </Button>
                    <Button variant="outline">Cadastre-se</Button>
                </div>
            </div>
        </header>
    );
}
