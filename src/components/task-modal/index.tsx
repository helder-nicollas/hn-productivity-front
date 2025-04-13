'use client';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createTask } from './create-task';

const formSchema = z.object({
    title: z.string().min(1, 'Campo Obrigatório'),
});

type FormSchema = z.infer<typeof formSchema>;

type FieldErrors = {
    title?: string[];
};

function TaskModal() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { register, handleSubmit } = useForm<FormSchema>({
        mode: 'onSubmit',
    });

    const handleCreateTask = async (data: FormSchema) => {
        const boardId = searchParams
            .get('create-task')
            ?.split(',')[0] as string;
        const sectionId = searchParams
            .get('create-task')
            ?.split(',')[1] as string;

        await createTask({ boardId, sectionId, ...data });
    };

    return (
        <Dialog
            open={!!searchParams.get('create-task')}
            onOpenChange={router.back}
        >
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit(handleCreateTask)}>
                    <DialogHeader>
                        <DialogTitle>Criar tarefa</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Título
                            </Label>
                            <Input
                                {...register('title')}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export { TaskModal, type FormSchema, type FieldErrors };
