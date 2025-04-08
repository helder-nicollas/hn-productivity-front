import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';

type HeaderLogoProps = ComponentProps<'h1'>;
function HeaderLogo({ className, ref, ...props }: HeaderLogoProps) {
    return (
        <h1
            {...props}
            ref={ref}
            className={cn('text-2xl font-bold', className)}
        >
            Hn Productivity
        </h1>
    );
}

export { HeaderLogo };
