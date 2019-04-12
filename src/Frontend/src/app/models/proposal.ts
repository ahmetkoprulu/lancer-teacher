import { Project } from './project';
import { Instructor } from './instructor';

export class Proposal {
    id: number;
    comment: string;
    pId: number;

    project: Project;
    iId: number;
    instructor: Instructor;
}
