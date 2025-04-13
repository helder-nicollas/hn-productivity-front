'use server';

import { IActionResponse } from '@/types/action-response';
import { FieldErrors, FormSchema } from '.';
import { fetcher } from '@/utils/api';
import { getSession } from '@/utils/auth';
import { revalidatePath } from 'next/cache';

interface ICreateTaskParams extends FormSchema {
    boardId: string;
    sectionId: string;
}

export async function createTask({
    boardId,
    sectionId,
    ...data
}: ICreateTaskParams): Promise<IActionResponse<FieldErrors>> {
    try {
        const session = await getSession();
        const token = session?.user.accessToken as string;

        await fetcher(`/boards/${boardId}/sections/${sectionId}/tasks`, {
            method: 'POST',
            body: JSON.stringify(data),
            token,
        });

        revalidatePath('/');
        return {
            message: 'Tarefa criada com sucesso.',
            type: 'success',
        };
    } catch (err) {
        console.log(err);
        return {
            message: 'Algo deu errado ao criar esta tarefa.',
            type: 'serverError',
        };
    }
}
