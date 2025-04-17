'use client';
import { SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar';
import { fetcher } from '@/utils/api';
import { IBoard } from '@/types/board';
import { SidebarBoardsListSkeleton } from './skeleton';
import { useSession } from 'next-auth/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuShortcut,
    ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { useParams } from 'next/navigation';
import { deleteBoard } from './action';
import { useTransition } from 'react';
import { Loading } from '../loading';
import Link from 'next/link';

function SidebarBoardsList() {
    const params = useParams();
    const session = useSession();
    const token = session?.data?.user?.accessToken;
    const [isPending, startTransition] = useTransition();
    const queryClient = useQueryClient();

    const { data: result, isLoading } = useQuery({
        queryKey: ['boards'],
        queryFn: async () => await fetcher<IBoard[]>('/boards', { token }),
        enabled: !!token,
    });

    const handleDeleteBoard = (boardId: string) => {
        deleteBoard(boardId);
        queryClient.refetchQueries({ queryKey: ['boards'] });
    };

    if (isLoading) return <SidebarBoardsListSkeleton />;

    return (
        <>
            {result?.data?.map(board => (
                <SidebarMenuItem key={board.board_id}>
                    <ContextMenu>
                        <ContextMenuTrigger asChild>
                            <SidebarMenuButton
                                asChild
                                data-active={board.board_id === params.boardId}
                                className="rounded"
                            >
                                <Link
                                    href={`/application/boards/${board.board_id}`}
                                >
                                    <span>{board.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </ContextMenuTrigger>
                        <ContextMenuContent className="w-64">
                            <ContextMenuItem inset>
                                Rename
                                <ContextMenuShortcut>R</ContextMenuShortcut>
                            </ContextMenuItem>

                            <ContextMenuItem
                                inset
                                variant="destructive"
                                onClick={() =>
                                    startTransition(() =>
                                        handleDeleteBoard(board.board_id),
                                    )
                                }
                            >
                                {isPending ? <Loading /> : 'Delete'}
                                <ContextMenuShortcut>D</ContextMenuShortcut>
                            </ContextMenuItem>
                        </ContextMenuContent>
                    </ContextMenu>
                </SidebarMenuItem>
            ))}
        </>
    );
}

export { SidebarBoardsList, SidebarBoardsListSkeleton };
