import { User } from './user.model';
import { Role } from './role.model';

export class Admin extends User {
  constructor(
    username: string,
    password: string,
    id?: number,
    name?: string,
    lastName?: string,
    email?: string,
    role?: Role,
  ) {
    super(username, password, id, name, lastName, email, role);
  }
}
