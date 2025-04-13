import { ITask } from './task';

export interface ISection {
    section_id: string;
    title?: string | null;
    created_at: string;
    updated_at: string;
    board_id: string;
    tasks: ITask[];
}
