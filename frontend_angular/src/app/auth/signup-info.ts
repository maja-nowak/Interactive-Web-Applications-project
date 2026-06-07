export class SignupInfo {
  username: string;
  role: string;
  password: string;
  name: string;
  lastName: string;
  email: string;

  constructor(username: string, password: string, name: string, lastName: string, email: string, role: string) {
    this.username = username;
    this.role = role;
    this.password = password;
    this.name = name;
    this.lastName = lastName;
    this.email = email;
  }
}

