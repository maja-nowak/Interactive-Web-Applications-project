import { User } from './user.model';
import { Subject } from './subject.model';
import { Role } from './role.model';

export class Teacher extends User {
  subjects?: Subject[];

  constructor(
    username: string,
    password: string,
    id?: number,
    name?: string,
    lastName?: string,
    email?: string,
    role?: Role,
    subjects?: Subject[]
  ) {
    super(username, password, id, name, lastName, email, role);
    this.subjects = subjects;
  }
}
