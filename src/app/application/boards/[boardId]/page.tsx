import {
    BoardHeaderInputs,
    Section,
    CreateBoard,
    CreateSection,
    Sidebar,
    TaskModal,
    Task,
} from '@/components';
import { SidebarBoardsList, SidebarBoardsListSkeleton } from '@/components';
import { Input } from '@/components/ui/input';
import {
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
} from '@/components/ui/sidebar';
import { IBoard } from '@/types/board';
import { fetcher } from '@/utils/api';
import { getSession } from '@/utils/auth';
import { Search } from 'lucide-react';
import { revalidatePath } from 'next/cache';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

type BoardPageProps = {
    params: {
        boardId: string;
    };
};

export default async function BoardsPage({ params }: BoardPageProps) {
    const { boardId } = await params;
    const session = await getSession();
    const token = session?.user.accessToken as string;

    const { data: board } = await fetcher<IBoard | null>(`/boards/${boardId}`, {
        token,
    });

    if (!board) return notFound();

    const createBoard = async () => {
        'use server';
        await fetcher('/boards', { token, method: 'POST' });
        revalidatePath(`/application/boards/${boardId}`);
    };

    const createSection = async () => {
        'use server';
        await fetcher(`/boards/${boardId}/sections`, {
            token,
            method: 'POST',
        });
        revalidatePath(`/application/boards/${boardId}`);
    };

    return (
        <>
            <Sidebar>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel className="text-base relative top-1">
                            Seus Boards
                        </SidebarGroupLabel>
                        <CreateBoard action={createBoard} />
                        <SidebarGroupContent className="mt-5">
                            <div className="relative">
                                <Input
                                    placeholder="Pesquisar board..."
                                    className="mb-3 h-10"
                                />
                                <Search className="absolute top-[10px] opacity-50 size-5 right-2" />
                            </div>
                            <SidebarMenu>
                                <Suspense
                                    fallback={<SidebarBoardsListSkeleton />}
                                >
                                    <SidebarBoardsList
                                        currentBoardId={boardId}
                                    />
                                </Suspense>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
            <main className="mt-24 px-5 h-[calc(100% - 160px)] w-full pb-10 flex flex-col">
                <header className="flex flex-col w-full">
                    <BoardHeaderInputs board={board} />
                    <CreateSection action={createSection} />
                </header>
                <hr className="my-5" />
                <div className="flex gap-10 h-full">
                    {board.sections?.map(section => (
                        <Section key={section.section_id} section={section}>
                            <div className="mt-5 space-y-4">
                                {section.tasks.map(task => (
                                    <Task key={task.task_id} task={task} />
                                ))}
                            </div>
                        </Section>
                    ))}
                </div>
                <TaskModal />
            </main>
        </>
    );
}
