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
import { Loading } from '../loading';
import Link from 'next/link';
import { EnvelopeIcon, PasswordIcon } from '../icons';

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
        <form
            onSubmit={handleSubmit(handleLogin)}
            className="w-full flex flex-col"
        >
            <h1 className="text-4xl font-bold mb-6 text-center">Login</h1>
            <div className="space-y-4">
                <div className="space-y-1 relative">
                    <Label>E-mail</Label>
                    <Input {...register('email')} className="h-12" />
                    <EnvelopeIcon className="absolute top-[48%] w-5 h-5 right-4 opacity-25" />
                    <Feedback message={errors?.password?.message} />
                </div>
                <div className="space-y-1 relative">
                    <Label>Senha</Label>
                    <Input
                        {...register('password')}
                        className="h-12"
                        type="password"
                    />
                    <PasswordIcon className="absolute top-[48%] w-5 h-5 right-4 opacity-25" />
                    <Feedback message={errors?.password?.message} />
                </div>
            </div>
            <div className="my-2">
                <Link
                    className="text-blue-300 hover:underline cursor-pointer"
                    href="#"
                >
                    Esqueceu a senha?
                </Link>
            </div>
            <div className="mt-2 w-full">
                <Button
                    className="w-full font-bold text-lg"
                    disabled={isSubmitting}
                    size="xl"
                >
                    {isSubmitting ? <Loading /> : 'Entrar'}
                </Button>
            </div>
        </form>
    );
}
