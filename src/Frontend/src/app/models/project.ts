import { Proposal } from './proposal';
import { Student } from './student';

export class Project {
  id: number;
  title: string;
  description: string;
  deadline: string;
  minPrice: number;
  maxPrice: number;

  sId: number;
  student: Student;
  tId: string;

  proposals: Proposal[];
}
