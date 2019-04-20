import { Proposal } from './proposal';
import { Student } from './student';

export class Project {
  id: number;
  title: string;
  description: string;
  deadline: string;
  // tslint:disable-next-line:variable-name
  min_price: number;
  // tslint:disable-next-line:variable-name
  max_price: number;

  // tslint:disable-next-line:variable-name
  s_id: number;
  student: Student;
  // tslint:disable-next-line:variable-name
  t_id: string;

  proposals: Proposal[];
}
