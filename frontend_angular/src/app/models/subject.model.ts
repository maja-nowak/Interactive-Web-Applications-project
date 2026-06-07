import { Teacher } from './teacher.model';
import { Enrollment } from './enrollment.model';

export class Subject {
  id?: number;
  name?: string;
  description?: string;
  teacher?: Teacher;
  enrollments?: Enrollment[];

  constructor(
    name?: string,
    description?: string,
    teacher?: Teacher,
    enrollments?: Enrollment[],
    id?: number
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.teacher = teacher;
    this.enrollments = enrollments ?? [];
  }
}
