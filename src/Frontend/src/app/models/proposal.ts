import { Project } from './project';
import { Instructor } from './instructor';

export class Proposal {
    id: number;
    comment: string;
    // tslint:disable-next-line:variable-name
    p_id: number;

    project: Project;
    // tslint:disable-next-line:variable-name
    i_id: number;
    instructor: Instructor;
}
