import { Proposal } from './proposal';
import { Student } from './student';

export class Contract {
    id: number;

    // tslint:disable-next-line:variable-name
    p_id: number;
    proposal: Proposal;
    // tslint:disable-next-line:variable-name
    s_id: number;
    student: Student;
}
