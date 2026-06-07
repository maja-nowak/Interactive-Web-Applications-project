import { Role } from './role.model';

export class User {
  id?: number;
  name?: string;
  lastName?: string;
  username!: string;
  email?: string;
  password!: string;
  role?: Role;

  constructor(
    username: string,
    password: string,
    id?: number,
    name?: string,
    lastName?: string,
    email?: string,
    role?: Role
  ) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
