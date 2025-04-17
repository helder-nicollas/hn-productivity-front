import { IBoard } from '@/types/board';
import { fetcher } from '@/utils/api';
import { getSession } from '@/utils/auth';
import { redirect } from 'next/navigation';

export default async function BoardsPage() {
    const session = await getSession();
    const token = session?.user.accessToken as string;

    const { data: boards } = await fetcher<IBoard[]>(`/boards`, {
        token,
    });

    return <div>Página de boards</div>;
}
