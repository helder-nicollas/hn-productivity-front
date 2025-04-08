import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';

type AlertProps = ComponentProps<'div'> & { message?: string };
function Alert({ ref, className, message, ...props }: AlertProps) {
    return (
        <div
            {...props}
            className={cn(
                'w-full p-4 shadow-md rounded-md hidden data-[visible=true]:block font-bold text-center bg-red-900 mb-2',
                className,
            )}
            ref={ref}
            data-visible={!!message}
        >
            {message}
        </div>
    );
}

export { Alert, type AlertProps };
