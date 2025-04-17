import { SidebarMenuItem } from '../ui/sidebar';
import { fetcher } from '@/utils/api';
import { getSession } from '@/utils/auth';
import { IBoard } from '@/types/board';
import { SidebarBoardsListSkeleton } from './skeleton';
import { SidebarBoardsListButton } from '../sidebar-boards-list-button';

async function SidebarBoardsList() {
    const session = await getSession();
    const token = session?.user.accessToken as string;

    const { data: boards } = await fetcher<IBoard[]>('/boards', { token });

    return (
        <>
            {boards?.map(board => (
                <SidebarMenuItem key={board.board_id}>
                    <SidebarBoardsListButton board={board} />
                </SidebarMenuItem>
            ))}
        </>
    );
}

export { SidebarBoardsList, SidebarBoardsListSkeleton };
