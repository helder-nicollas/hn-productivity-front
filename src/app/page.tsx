import { Header } from '@/components/header';
import { HeroPattern } from '@/components/hero';

export default async function Home() {
    return (
        <>
            <Header />
            <main className="min-h-screen flex justify-center items-center overflow-x-hidden relative">
                <div className="absolute top-[28%]">
                    <HeroPattern />
                </div>
                <h1 className="font-bold text-5xl">Hn-Productivity</h1>
            </main>
        </>
    );
}
