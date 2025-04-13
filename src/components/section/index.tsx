/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { cn } from '@/lib/utils';
import { ComponentProps, useState } from 'react';
import { Button } from '../ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { ISection } from '@/types/section';
import { useMutation } from '@tanstack/react-query';
import { fetcher } from '@/utils/api';
import { deleteSection } from './delete-section';
import Link from 'next/link';

type SectionProps = ComponentProps<'div'> & {
    section: ISection;
};

function Section({
    className,
    ref,
    children,
    section,
    ...props
}: SectionProps) {
    const [title, setTitle] = useState(section.title || '');
    const [time, setTime] = useState<any>();
    const { data } = useSession();

    const token = data?.user.accessToken as string;

    const { mutate } = useMutation({
        mutationFn: async () => {
            fetcher(
                `/boards/${section.board_id}/sections/${section.section_id}`,
                {
                    body: JSON.stringify({
                        title,
                    }),
                    method: 'PUT',
                    token,
                },
            );
        },
        onError: error => {
            console.log(error);
        },
    });

    const handleChangeTitle = async (value: string) => {
        setTitle(value);
        clearTimeout(time);
        const timeout = setTimeout(() => {
            mutate();
        }, 2000);
        setTime(timeout);
    };

    const handleDeleteSection = async () => {
        await deleteSection({
            boardId: section.board_id,
            sectionId: section.section_id,
        });
    };

    return (
        <div
            {...props}
            ref={ref}
            className={cn(
                'bg-background border w-72 h-full rounded-xl shadow-md p-4',
                className,
            )}
        >
            <div className="flex gap-2">
                <input
                    className="font-bold text-xl w-full outline-0"
                    placeholder="Seção sem título"
                    value={title}
                    onChange={e => handleChangeTitle(e.target.value)}
                />
                <div className="flex">
                    <Button
                        variant="ghost"
                        className="hover:text-destructive text-red-600"
                        onClick={handleDeleteSection}
                    >
                        <Trash2 />
                    </Button>
                    <Button
                        variant="ghost"
                        className="hover:text-emerald-300/80 text-emerald-300"
                        asChild
                    >
                        <Link
                            href={`?create-task=${section.board_id},${section.section_id}`}
                        >
                            <Plus />
                        </Link>
                    </Button>
                </div>
            </div>

            {children}
        </div>
    );
}

export { Section };
