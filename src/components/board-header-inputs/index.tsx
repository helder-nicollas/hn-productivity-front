/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { IBoard } from '@/types/board';
import { BookCheckIcon } from 'lucide-react';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { fetcher } from '@/utils/api';
import { useSession } from 'next-auth/react';

type BoardHeaderInputsProps = {
    board: IBoard;
};

function BoardHeaderInputs({ board }: BoardHeaderInputsProps) {
    const [boardTitle, setBoardTitle] = useState(String(board.title));
    const [boardDescription, setBoardDescription] = useState(
        board.description ? board.description : '',
    );
    const [time, setTime] = useState<any>();
    const { data } = useSession();

    const token = data?.user.accessToken as string;

    const { mutate } = useMutation({
        mutationFn: async () => {
            fetcher(`/boards/${board.board_id}`, {
                body: JSON.stringify({
                    title: boardTitle,
                    description: boardDescription,
                }),
                method: 'PUT',
                token,
            });
        },
        onError: error => {
            console.log(error);
        },
    });

    const handleChangeTitle = async (value: string) => {
        setBoardTitle(value);
        clearTimeout(time);
        const timeout = setTimeout(() => {
            mutate();
        }, 2000);
        setTime(timeout);
    };

    const handleChangeDescription = async (value: string) => {
        setBoardDescription(value);
        clearTimeout(time);
        const timeout = setTimeout(() => {
            mutate();
        }, 2000);
        setTime(timeout);
    };

    return (
        <>
            <div className="flex gap-3 items-center mb-5">
                <BookCheckIcon className="size-7 opacity-50" />
                <input
                    onChange={e => handleChangeTitle(e.target.value)}
                    className="outline-0 text-2xl max-w-4xl w-full font-bold"
                    placeholder="Painel sem título"
                    value={boardTitle}
                />
            </div>
            <textarea
                className="max-w-3xl outline-none resize-none"
                placeholder="Descreva seu board aqui..."
                onChange={e => handleChangeDescription(e.target.value)}
                rows={3}
                defaultValue={boardDescription}
            />
        </>
    );
}

export { BoardHeaderInputs };
