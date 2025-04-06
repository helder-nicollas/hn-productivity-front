import { HeroPattern } from '@/components/hero';

export default function Home() {
    return (
        <main className="min-h-screen flex justify-center items-center">
            <div className="absolute">
                <HeroPattern />
            </div>
            <h1>Hn-Productivity</h1>
        </main>
    );
}
