import { Button } from '@/components/ui/button';
import { BookCheckIcon } from 'lucide-react';

export default function BoardsPage() {
    return (
        <main className="mt-24 px-5 h-[calc(100% - 160px)] w-full pb-10 flex flex-col">
            <header className="flex flex-col w-full">
                <div className="flex gap-3 items-center mb-5">
                    <BookCheckIcon className="size-7 opacity-50" />
                    <input
                        className="outline-0 text-2xl max-w-4xl w-full font-bold"
                        placeholder="Board sem título"
                    />
                </div>
                <textarea
                    className="max-w-3xl outline-none resize-none"
                    placeholder="Descreva seu board aqui..."
                    rows={3}
                ></textarea>
                <Button
                    className="w-48 shadow-md text-base"
                    variant="outline"
                    size="xl"
                >
                    Adicionar nova seção
                </Button>
            </header>
            <hr className="my-5" />
            <div className="flex gap-10 h-full">
                <div className="bg-background border w-72 h-full rounded-xl shadow-md p-4">
                    <input
                        className="font-bold text-xl w-full outline-0"
                        placeholder="Seção sem título"
                    />
                    <div className="mt-5">
                        <div className="overflow-hidden rounded-md bg-secondary w-full shadow-md">
                            <div className="bg-white h-8 w-full" />
                            <div className="p-3">
                                <h3 className="text-lg font-bold">
                                    Task 01 Task 01 Task 01 Task 01 Task 01 Task
                                    01
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
