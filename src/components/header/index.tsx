import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';
import { HeaderLogo } from './hader-logo';
import { HeaderDropdown } from './header-dropdown';

type HeaderProps = ComponentProps<'header'>;
function Header({ className, children, ...props }: HeaderProps) {
    return (
        <header
            {...props}
            className={cn(
                'border-b bg-secondary fixed w-full h-16 flex items-center top-0 px-2 shadow-md z-20',
                className,
            )}
        >
            {children}
        </header>
    );
}

Header.Logo = HeaderLogo;
Header.Dropdown = HeaderDropdown;

export { Header };
