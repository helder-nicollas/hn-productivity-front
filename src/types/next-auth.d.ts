import 'next-auth';
import { IUser } from './IUser';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    interface User extends IUser {
        accessToken: string;
        email: string;
        name: string;
        exp: number;
        jti: string;
        sub: string;
    }

    interface Session extends DefaultSession {
        user: User;
        expires_in: string;
        refreshToken: string;
        accessToken: string;
        error: string;
    }
}
