import { Project } from './project';
import { Proposal } from './proposal';

export class Instructor {
    id: number;
    name: string;
    surname: string;
    passwordHash: string;
    email: string;

    projects: Project[];
    proposals: Proposal[];
}
