import { Container } from '@/components';
import { Header } from '@/components/header';
import { HeroPattern } from '@/components/hero';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function Home() {
    return (
        <>
            <Header>
                <Container size="lg" className="flex justify-between">
                    <Header.Logo />
                    <div className="flex gap-2">
                        <Button asChild>
                            <Link href="/auth">Entrar</Link>
                        </Button>
                        <Button variant="outline">Cadastre-se</Button>
                    </div>
                </Container>
            </Header>
            <main className="min-h-screen flex justify-center items-center overflow-x-hidden relative">
                <div className="absolute top-[28%]">
                    <HeroPattern />
                </div>
                <h1 className="font-bold text-5xl">Hn-Productivity</h1>
            </main>
        </>
    );
}
