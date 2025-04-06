import { AuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { fetcher } from './api';
import { IUser } from '@/types/user';

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'E-mail',
                    type: 'text',
                    placeholder: 'Informe seu e-mail',
                },
                password: {
                    label: 'Senha',
                    type: 'text',
                    placeholder: 'Informe sua senha',
                },
            },
            async authorize(credentials) {
                const { response, data } = await fetcher<{
                    user: IUser;
                    token: string;
                    refreshToken: string;
                }>('/users/login', {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { 'Content-Type': 'application/json' },
                });
                if (response.ok && data.user) {
                    return {
                        name: data.user.name,
                        email: data.user.email,
                        id: data.user.user_id,
                        accessToken: data.token,
                    } as User;
                }

                return null;
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.accessToken = user.accessToken;
            }
            return { ...token, ...user };
        },
        async session({ session, token }) {
            session.user = {
                ...session.user,
                id: token.id as string,
                accessToken: token.accessToken as string,
            };
            return session;
        },
    },
};
