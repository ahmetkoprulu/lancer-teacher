import { Project } from './project';
import { Proposal } from './proposal';

export class User {
    id: number;
    name: string;
    surname: string;
    // tslint:disable-next-line:variable-name
    password_hash: string;
    email: string;
    role: string = null;

    projects: Project[];
    proposals: Proposal[];
}
