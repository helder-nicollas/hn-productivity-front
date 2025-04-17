'use server';
import { fetcher } from '@/utils/api';
import { getSession } from '@/utils/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function deleteBoard(boardId: string) {
    const session = await getSession();
    const token = session?.user.accessToken as string;

    await fetcher(`/boards/${boardId}`, {
        method: 'DELETE',
        token,
    });

    revalidatePath(`/application/boards/${boardId}`);
    redirect('/application/boards');
}
