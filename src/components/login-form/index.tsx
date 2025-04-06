'use client';

import { z } from 'zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Feedback } from '../feedback';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
    email: z
        .string({ required_error: 'Campo obrigatório' })
        .email('Informe um e-mail válido'),
    password: z.string({ required_error: 'Campo obrigatório' }),
});

type FormSchema = z.infer<typeof formSchema>;

export function LoginForm() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        reValidateMode: 'onSubmit',
        mode: 'onSubmit',
    });

    const handleLogin = async (data: FormSchema) => {
        const { email, password } = data;
        const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
            callbackUrl: '/boards',
        });

        if (!result?.ok) {
            return console.log(result?.error);
        }
        return router.replace('/boards');
    };

    return (
        <div className="bg-secondary p-10 shadow-md rounded-md">
            <h1 className="text-2xl font-bold">Login</h1>
            <form onSubmit={handleSubmit(handleLogin)}>
                <div className="space-y-1">
                    <Label>E-mail</Label>
                    <Input {...register('email')} />
                    <Feedback message={errors?.email?.message} />
                </div>
                <div className="space-y-1">
                    <Label>Senha</Label>
                    <Input {...register('password')} type="password" />
                    <Feedback message={errors?.password?.message} />
                </div>
                <Button disabled={isSubmitting}>Entrar</Button>
            </form>
        </div>
    );
}
