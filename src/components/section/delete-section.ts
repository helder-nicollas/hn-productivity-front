'use server';
import { IActionResponse } from '@/types/action-response';
import { fetcher } from '@/utils/api';
import { getSession } from '@/utils/auth';
import { revalidatePath } from 'next/cache';

interface IDeleteActionParams {
    boardId: string;
    sectionId: string;
}

export async function deleteSection({
    sectionId,
    boardId,
}: IDeleteActionParams): Promise<IActionResponse> {
    try {
        const session = await getSession();
        const token = session?.user.accessToken as string;

        await fetcher(`/boards/${boardId}/sections/${sectionId}/`, {
            method: 'DELETE',
            token,
        });

        revalidatePath('/');
        return {
            message: 'Seção deletada com sucesso.',
            type: 'serverError',
        };
    } catch (err) {
        console.log(err);
        return {
            message: 'Algo deu errado ao deletar esta seção',
            type: 'serverError',
        };
    }
}
