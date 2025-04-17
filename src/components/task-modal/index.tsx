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
import MDEditor, { commands } from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';
import './md-editor.css';
import { Loading } from '../loading';
import { Feedback } from '../feedback';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';

const formSchema = z.object({
    title: z.string().min(1, 'Campo Obrigatório'),
    content: z.string().nullish(),
});

type FormSchema = z.infer<typeof formSchema>;

function TaskModal() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { isSubmitting, errors },
    } = useForm<FormSchema>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        defaultValues: {
            content: '',
            title: '',
        },
        resolver: zodResolver(formSchema),
    });

    const content = watch('content');

    const handleCreateTask = async (data: FormSchema) => {
        const boardId = searchParams
            .get('create-task')
            ?.split(',')[0] as string;
        const sectionId = searchParams
            .get('create-task')
            ?.split(',')[1] as string;

        await createTask({ boardId, sectionId, ...data });
        handleCloseForm();
    };

    const handleCloseForm = useCallback(() => {
        router.back();
        reset();
    }, [reset, router]);

    return (
        <Dialog
            open={!!searchParams.get('create-task')}
            onOpenChange={handleCloseForm}
        >
            <DialogContent className="">
                <form onSubmit={handleSubmit(handleCreateTask)}>
                    <DialogHeader>
                        <DialogTitle>Criar tarefa</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-right">
                                Título
                            </Label>
                            <Input
                                {...register('title')}
                                className="col-span-3"
                            />
                            <Feedback message={errors.title?.message} />
                        </div>
                        <MDEditor
                            className="min-h-[500px] w-full"
                            value={content as string}
                            onChange={value => setValue('content', value)}
                            commands={[
                                commands.group(
                                    [
                                        commands.title3,
                                        commands.title4,
                                        commands.title5,
                                        commands.title6,
                                    ],
                                    {
                                        name: 'title',
                                        groupName: 'title',
                                        buttonProps: {
                                            'aria-label': 'Insert title',
                                        },
                                    },
                                ),
                                commands.bold,
                                commands.divider,
                                commands.italic,
                                commands.link,
                            ]}
                            preview="edit"
                            previewOptions={{
                                rehypePlugins: [[rehypeSanitize]],
                            }}
                        />
                    </div>
                    <DialogFooter>
                        <Button
                            type="submit"
                            className="w-32"
                            disabled={isSubmitting}
                        >
                            {' '}
                            {isSubmitting ? <Loading /> : 'Save changes'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export { TaskModal, type FormSchema };
