import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';

type TaskProps = ComponentProps<'div'>;

function Task({ ref, className, ...props }: TaskProps) {
    return (
        <div
            {...props}
            ref={ref}
            className={cn(
                'overflow-hidden rounded-md bg-secondary w-full shadow-md',
                className,
            )}
        >
            <div className="bg-white h-8 w-full" />
            <div className="p-3">
                <h3 className="text-lg font-bold">
                    Task 01 Task 01 Task 01 Task 01 Task 01 Task 01
                </h3>
            </div>
        </div>
    );
}

export { Task };
