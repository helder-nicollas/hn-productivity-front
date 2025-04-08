import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

async function GuestLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession();

    if (session) redirect('/boards');

    return children;
}

export { GuestLayout };
