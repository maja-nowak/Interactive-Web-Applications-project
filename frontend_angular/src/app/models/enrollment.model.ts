import { Student } from './student.model';
import { Subject } from './subject.model';

export class Enrollment {
  id?: number;
  student?: Student;
  subject?: Subject;
  grade?: number;

  constructor(
    student?: Student,
    subject?: Subject,
    grade?: number,
    id?: number
  ) {
    this.id = id;
    this.student = student;
    this.subject = subject;
    this.grade = grade;
  }
}
