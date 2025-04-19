/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { cn } from '@/lib/utils';
import { ComponentPropsWithoutRef, useActionState, useState } from 'react';
import { Button } from '../ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { ISection } from '@/types/section';
import { useMutation } from '@tanstack/react-query';
import { fetcher } from '@/utils/api';
import { deleteSection } from './delete-section';
import { useDroppable } from '@dnd-kit/core';
import { Loading } from '../loading';
import Link from 'next/link';

type SectionProps = ComponentPropsWithoutRef<'div'> & {
    section: ISection;
};

function Section({ className, children, section, ...props }: SectionProps) {
    const [title, setTitle] = useState(section.title || '');
    const [time, setTime] = useState<any>();
    const deleteSectionWithParams = deleteSection.bind(null, {
        boardId: section.board_id,
        sectionId: section.section_id,
    });
    const [_, dispatch, isPending] = useActionState(
        deleteSectionWithParams,
        null,
    );
    const { data } = useSession();
    const { setNodeRef } = useDroppable({
        id: section.section_id,
        data: {
            ...section,
            type: 'section',
        },
    });

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

    return (
        <div
            {...props}
            className={cn(
                'bg-background border w-72 min-h-full rounded-xl shadow-md py-4',
                className,
            )}
        >
            <div className="flex gap-2 px-4">
                <input
                    className="font-bold text-xl w-full outline-0"
                    placeholder="Seção sem título"
                    value={title}
                    onChange={e => handleChangeTitle(e.target.value)}
                />
                <div className="flex">
                    <form action={dispatch}>
                        <Button
                            variant="ghost"
                            className="hover:text-destructive text-red-600"
                            disabled={isPending}
                        >
                            {isPending ? <Loading /> : <Trash2 />}
                        </Button>
                    </form>
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
            <div
                className="mt-5 space-y-4 overflow-auto relative px-4 scroll-style h-[calc(100%-60px)]"
                ref={setNodeRef}
            >
                {children}
            </div>
        </div>
    );
}

export { Section };
