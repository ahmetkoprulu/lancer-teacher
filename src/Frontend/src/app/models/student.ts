import { Project } from './project';
import { Contract } from './contract';

export class Student {
    id: number;
    name: string;
    surname: string;
    passwordHash: string;
    email: string;

    projects: Project[];
    contracts: Contract[];
}
