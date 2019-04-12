import { Proposal } from './proposal';
import { Student } from './student';

export class Contract {
    id: number;

    pid: number;
    proposal: Proposal;
    sid: number;
    student: Student;
}
