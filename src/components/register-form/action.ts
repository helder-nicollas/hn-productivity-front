/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { IActionResponseWithData } from '@/types/action-response';
import { FormSchema, formSchema } from './schema';
import { IFieldErrors } from './schema';
import { fetcher } from '@/utils/api';

export async function registerUser(
    _state: unknown,
    formData: FormData,
): Promise<IActionResponseWithData<Partial<FormSchema>, IFieldErrors>> {
    const data = Object.fromEntries(formData) as FormSchema;
    try {
        const result = formSchema.safeParse(data);

        if (result.error)
            return {
                errors: result.error.flatten().fieldErrors,
                data: {
                    email: data.email,
                    password: data.password,
                },
            };

        await fetcher('/users', {
            body: JSON.stringify(data),
            method: 'POST',
        });

        return {
            type: 'success',
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
            },
        };
    } catch (err: any) {
        console.log(err);
        return {
            type: 'serverError',
            message: `Erro: ${err.message}`,
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
            },
        };
    }
}
