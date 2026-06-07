import { User } from './user.model';
import { Enrollment } from './enrollment.model';
import { Role } from './role.model';

export class Student extends User {
  enrollments?: Enrollment[];

  constructor(
    username: string,
    password: string,
    id?: number,
    name?: string,
    lastName?: string,
    email?: string,
    role?: Role,
    enrollments?: Enrollment[]
  ) {
    super(username, password, id, name, lastName, email, role);
    this.enrollments = enrollments ?? [];
  }
}
