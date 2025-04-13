import { cn } from '@/lib/utils';
import { ITask } from '@/types/task';
import { ComponentProps } from 'react';

type TaskProps = ComponentProps<'div'> & {
    task: ITask;
};

function Task({ ref, className, task, ...props }: TaskProps) {
    return (
        <div
            {...props}
            ref={ref}
            className={cn(
                'overflow-hidden rounded-md bg-secondary w-full shadow-md',
                className,
            )}
        >
            <div
                className="h-8 w-full"
                style={{ backgroundColor: task.color }}
            />
            <div className="p-3">
                <h3 className="text-lg font-bold">{task.title}</h3>
            </div>
        </div>
    );
}

export { Task };
