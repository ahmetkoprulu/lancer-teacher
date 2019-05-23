import { Project } from './project';
import { User } from './instructor';

export class Proposal {
    id: number;
    comment: string;
    price: number;
    // tslint:disable-next-line:variable-name
    p_id: number;
    // tslint:disable-next-line:variable-name
    i_id: number;
    name: string;
    surname: string;

    title: string;
    date: string;
    count: number;
    avg: number;
}
