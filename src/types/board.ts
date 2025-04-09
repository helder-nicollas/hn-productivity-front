import { ISection } from './section';

export interface IBoard {
    board_id: string;
    user_id: string;
    title: string;
    description: string | null;
    created_at: string;
    updated_at: string;
    sections: ISection[];
}
