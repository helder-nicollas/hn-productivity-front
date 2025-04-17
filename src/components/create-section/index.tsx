'use client';
import { useActionState } from 'react';
import { Button } from '../ui/button';
import { Loading } from '../loading';
import { createSection } from './action';
import { useParams } from 'next/navigation';

function CreateSection() {
    const params = useParams();
    const createSectionWithBoardId = createSection.bind(
        null,
        String(params.boardId),
    );
    const [_, dispatch, isPending] = useActionState(
        createSectionWithBoardId,
        null,
    );
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
