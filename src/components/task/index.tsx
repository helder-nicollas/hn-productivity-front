'use client';
import { cn } from '@/lib/utils';
import { ITask } from '@/types/task';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ComponentPropsWithoutRef } from 'react';

type TaskProps = ComponentPropsWithoutRef<'div'> & {
    task: ITask;
};

function Task({ className, task, ...props }: TaskProps) {
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.task_id,
        data: {
            ...task,
            type: 'task',
        },
    });
    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
    };

    if (isDragging) {
        return (
            <div
                className="opacity-45 bg-secondary border-2 border-emerald-600 shadow-md rounded-md pointer-events-none h-[88px]"
                ref={setNodeRef}
                style={{
                    transform: CSS.Translate.toString(transform),
                    transition,
                    opacity: isDragging ? 0.5 : 1, // 👈 apenas mudar opacidade!
                    pointerEvents: isDragging ? 'none' : undefined, // 👈 impedir clique
                }}
            />
        );
    }

    return (
        <div
            {...props}
            {...attributes}
            {...listeners}
            style={style}
            ref={setNodeRef}
            className={cn(
                'overflow-hidden rounded bg-secondary w-full shadow-md flex min-h-20',
                className,
            )}
        >
            <div className="w-1" style={{ backgroundColor: task.color }} />
            <div className="p-3">
                <h3 className="text-base font-semibold">{task.title}</h3>
            </div>
        </div>
    );
}

export { Task };
