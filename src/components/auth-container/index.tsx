'use client';
import { useState } from 'react';
import { LoginForm } from '../login-form';
import { RegisterForm } from '../register-form';
import { Button } from '../ui/button';
import './auth-container.css';
import { cn } from '@/lib/utils';

export function AuthContainer() {
    const [active, setActive] = useState(false);
    return (
        <div
            className={cn(
                'shadow-[0px_0px_10px_#333333] rounded-2xl w-[900px] h-[550px] relative overflow-hidden auth-container',
                active && 'active',
            )}
        >
            <section className="animation-container before:bg-secondary">
                <div className="toggle-left">
                    <div className="text-center z-10">
                        <h1 className="text-3xl font-bold">
                            Olá, Bem-vindo ao HN-Productivity
                        </h1>
                        <h2 className="text-xl">Não possui conta?</h2>
                        <Button
                            className="w-xs h-12 font-bold text-lg mt-4"
                            onClick={() => setActive(true)}
                            size="xl"
                        >
                            Cadastre-se
                        </Button>
                    </div>
                </div>
                <div className="toggle-right">
                    <div className="text-center z-10">
                        <h1 className="text-3xl font-bold">
                            Olá, Bem-vindo de volta
                        </h1>
                        <h2 className="text-xl">Já possui uma conta?</h2>
                        <Button
                            className="w-xs font-bold text-lg mt-4"
                            onClick={() => setActive(false)}
                            size="xl"
                        >
                            Faça seu login
                        </Button>
                    </div>
                </div>
            </section>
            <div className="w-1/2 absolute right-0 flex flex-col items-center justify-center h-full px-16 bg-background login form">
                <LoginForm />
                <p
                    className="mt-5 text-lg text-blue-500 hover:underline cursor-pointer link"
                    onClick={() => setActive(true)}
                >
                    Não possui conta? Cadastre-se
                </p>
            </div>
            <div className="w-1/2 absolute right-0 flex flex-col items-center justify-center h-full px-16 bg-background register form">
                <RegisterForm />
                <p
                    className="mt-5 text-lg text-blue-500 hover:underline cursor-pointer link"
                    onClick={() => setActive(false)}
                >
                    Já possui uma conta? Faça seu login.
                </p>
            </div>
        </div>
    );
}
