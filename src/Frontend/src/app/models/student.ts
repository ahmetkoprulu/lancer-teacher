import { Project } from './project';
import { Contract } from './contract';

export class Student {
    id: number;
    name: string;
    surname: string;
    // tslint:disable-next-line:variable-name
    password_hash: string;
    email: string;

    projects: Project[];
    contracts: Contract[];
}
