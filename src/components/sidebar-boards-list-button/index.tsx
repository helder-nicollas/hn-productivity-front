'use client';

import Link from 'next/link';
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuShortcut,
    ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { SidebarMenuButton } from '../ui/sidebar';
import { IBoard } from '@/types/board';
import { useParams } from 'next/navigation';
import { useActionState } from 'react';
import { deleteBoard } from './action';
import { Loading } from '../loading';

type SidebarBoardsListButtonProps = {
    board: IBoard;
};

function SidebarBoardsListButton({ board }: SidebarBoardsListButtonProps) {
    const params = useParams();
    const deleteBoardWithBoardId = deleteBoard.bind(null, board.board_id);
    const [_, dispatch, isPending] = useActionState(
        deleteBoardWithBoardId,
        null,
    );

    return (
        <ContextMenu>
            <ContextMenuTrigger asChild>
                <SidebarMenuButton
                    asChild
                    data-active={board.board_id === params.boardId}
                    className="rounded"
                >
                    <Link href={`/application/boards/${board.board_id}`}>
                        <span>{board.title}</span>
                    </Link>
                </SidebarMenuButton>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-64">
                <ContextMenuItem inset>
                    Rename
                    <ContextMenuShortcut>R</ContextMenuShortcut>
                </ContextMenuItem>
                <form action={dispatch}>
                    <ContextMenuItem asChild inset variant="destructive">
                        <button className="w-full" type="submit">
                            {isPending ? <Loading /> : 'Delete'}
                            <ContextMenuShortcut>D</ContextMenuShortcut>
                        </button>
                    </ContextMenuItem>
                </form>
            </ContextMenuContent>
        </ContextMenu>
    );
}

export { SidebarBoardsListButton, type SidebarBoardsListButtonProps };
