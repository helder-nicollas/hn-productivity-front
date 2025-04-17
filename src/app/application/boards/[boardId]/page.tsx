import {
    BoardHeaderInputs,
    CreateSection,
    TaskModal,
    SectionsList,
} from '@/components';
import { IBoard } from '@/types/board';
import { fetcher } from '@/utils/api';
import { getSession } from '@/utils/auth';
import { notFound } from 'next/navigation';

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

    return (
        <main className="mt-24 px-5 h-[calc(100% - 160px)] w-full pb-10 flex flex-col">
            <header className="flex flex-col w-full">
                <BoardHeaderInputs board={board} />
                <CreateSection />
            </header>
            <hr className="my-5" />
            <div className="flex gap-10 h-full">
                <SectionsList sections={board.sections} />
            </div>
            <TaskModal />
        </main>
    );
}
