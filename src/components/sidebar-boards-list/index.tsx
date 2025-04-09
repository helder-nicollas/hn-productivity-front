import { SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar';
import { fetcher } from '@/utils/api';
import { getSession } from '@/utils/auth';
import { IBoard } from '@/types/board';
import { SidebarBoardsListSkeleton } from './skeleton';
import Link from 'next/link';

type SidebarBoardsListProps = {
    currentBoardId: string;
};

async function SidebarBoardsList({ currentBoardId }: SidebarBoardsListProps) {
    const session = await getSession();
    const token = session?.user.accessToken as string;

    const { data: boards } = await fetcher<IBoard[]>('/boards', { token });

    return (
        <>
            {boards.map(board => (
                <SidebarMenuItem key={board.board_id}>
                    <SidebarMenuButton
                        asChild
                        data-active={board.board_id === currentBoardId}
                        className="rounded"
                    >
                        <Link href={`/application/boards/${board.board_id}`}>
                            <span>{board.title}</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </>
    );
}

export { SidebarBoardsList, SidebarBoardsListSkeleton };
