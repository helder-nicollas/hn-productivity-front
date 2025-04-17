'use client';
import { Plus } from 'lucide-react';
import { SidebarGroupAction } from '../ui/sidebar';
import { useActionState } from 'react';
import { createBoard } from './action';
import { Loading } from '../loading';

function CreateBoard() {
    const [_, dispatch, isPending] = useActionState(createBoard, null);

    return (
        <form action={dispatch}>
            <SidebarGroupAction
                className="cursor-pointer size-8"
                disabled={isPending}
            >
                {isPending ? <Loading /> : <Plus />}
            </SidebarGroupAction>
        </form>
    );
}

export { CreateBoard };
