import { RoleName } from './role-name.enum';

export class Role {
  id?: number;
  name: RoleName;

  constructor(name: RoleName, id?: number) {
    this.name = name;
    if (id) this.id = id;
  }
}
