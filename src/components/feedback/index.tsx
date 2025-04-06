import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';

type FeedbackProps = ComponentProps<'span'> & {
    message?: string;
};

export function Feedback({ className, ref, message, ...props }: FeedbackProps) {
    return (
        <span
            {...props}
            ref={ref}
            className={cn(className, 'text-destructive text-sm')}
        >
            {message || null}
        </span>
    );
}
