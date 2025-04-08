import { z } from 'zod';

const formSchema = z.object({
    name: z.string().min(1, 'Campo obrigatório'),
    email: z
        .string()
        .min(1, 'Campo obrigatório')
        .email('Informe um e-mail válido'),
    password: z.string().min(1, 'Campo obrigatório'),
});

type FormSchema = z.infer<typeof formSchema>;

interface IFieldErrors {
    name?: string[];
    email?: string[];
    password?: string[];
}

export { formSchema, type FormSchema, type IFieldErrors };
