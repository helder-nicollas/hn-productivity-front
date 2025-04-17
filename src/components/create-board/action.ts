'use server';

import { fetcher } from '@/utils/api';
import { getSession } from '@/utils/auth';
import { revalidatePath } from 'next/cache';

export async function createBoard() {
    const session = await getSession();
    const token = session?.user.accessToken as string;

    await fetcher('/boards', { token, method: 'POST' });
    revalidatePath(`/`);

    return null;
}
