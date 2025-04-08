import { getServerSession } from 'next-auth';

async function AuthLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession();

    if (session) return children;

    return null;
}

export { AuthLayout };
