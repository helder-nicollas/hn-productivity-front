/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { Plus } from 'lucide-react';
import { SidebarGroupAction } from '../ui/sidebar';
import { useActionState } from 'react';

type CreateBoardProps = {
    action(): void;
};

function CreateBoard({ action }: CreateBoardProps) {
    const [_, dispatch, isPending] = useActionState(action, null);

    return (
        <form action={dispatch}>
            <SidebarGroupAction
                className="cursor-pointer size-8"
                disabled={isPending}
            >
                <Plus />
            </SidebarGroupAction>
        </form>
    );
}

export { CreateBoard };
