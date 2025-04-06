import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';

type ContainerProps = ComponentProps<'div'>;

function Container({ className, children, ref, ...props }: ContainerProps) {
    return (
        <div
            className={cn('container mx-auto min-h-screen', className)}
            ref={ref}
            {...props}
        >
            {children}
        </div>
    );
}

export { Container, type ContainerProps };
