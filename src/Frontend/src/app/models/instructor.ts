import { Project } from './project';
import { Proposal } from './proposal';

export class Instructor {
    id: number;
    name: string;
    surname: string;
    // tslint:disable-next-line:variable-name
    password_hash: string;
    email: string;

    projects: Project[];
    proposals: Proposal[];
}
