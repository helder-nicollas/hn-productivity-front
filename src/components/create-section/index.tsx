'use client';
import { useActionState } from 'react';
import { Button } from '../ui/button';
import { Loading } from '../loading';

type CreateSectionProps = {
    action(): void;
};

function CreateSection({ action }: CreateSectionProps) {
    const [_, dispatch, isPending] = useActionState(action, null);
    return (
        <form action={dispatch}>
            <Button
                className="w-48 shadow-md text-base"
                variant="outline"
                size="xl"
                disabled={isPending}
            >
                {isPending ? <Loading /> : 'Adicionar nova seção'}
            </Button>
        </form>
    );
}

export { CreateSection };
