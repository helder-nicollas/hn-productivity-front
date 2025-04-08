/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Feedback } from '../feedback';
import { useActionState, useCallback, useEffect } from 'react';
import { registerUser } from './action';
import { Loading } from '../loading';
import { Alert } from '../alert';
import { EnvelopeIcon, PasswordIcon, PersonIcon } from '../icons';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function RegisterForm() {
    const [state, dispatch, isPending] = useActionState(registerUser, null);
    const router = useRouter();

    const handleSignIn = useCallback(
        async (email: string, password: string) => {
            await signIn('credentials', {
                email,
                password,
                redirect: true,
                callbackUrl: '/boards',
            });
        },
        [router],
    );

    useEffect(() => {
        if (state?.type === 'success') {
            handleSignIn(state.data.email!, state.data.password!);
        }
    }, [state]);

    return (
        <form action={dispatch} className="w-full flex flex-col">
            <h1 className="text-4xl font-bold mb-6 text-center">Criar conta</h1>
            <Alert message={state?.message} />
            <div className="space-y-4">
                <div className="space-y-1">
                    <Label htmlFor="name">Nome</Label>
                    <div className="relative">
                        <Input name="name" id="name" className="h-12" />
                        <PersonIcon className="absolute top-[30%] w-5 h-5 right-4 opacity-25" />
                    </div>
                    <Feedback message={state?.errors?.name?.[0]} />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="email">E-mail</Label>
                    <div className="relative">
                        <Input name="email" id="email" className="h-12" />
                        <EnvelopeIcon className="absolute top-[30%] w-5 h-5 right-4 opacity-25" />
                    </div>
                    <Feedback message={state?.errors?.email?.[0]} />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="password">Senha</Label>
                    <div className="relative">
                        <Input
                            name="password"
                            id="password"
                            className="h-12"
                            type="password"
                        />
                        <PasswordIcon className="absolute top-[30%] w-5 h-5 right-4 opacity-25" />
                    </div>
                    <Feedback message={state?.errors?.password?.[0]} />
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
                    className="w-full h-12 font-bold text-lg"
                    disabled={isPending}
                    size="xl"
                >
                    {isPending ? <Loading /> : 'Criar conta'}
                </Button>
            </div>
        </form>
    );
}

export { RegisterForm };
