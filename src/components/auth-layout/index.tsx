import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

async function AuthLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession();

    if (session) return children;

    return redirect('/auth');
}

export { AuthLayout };
