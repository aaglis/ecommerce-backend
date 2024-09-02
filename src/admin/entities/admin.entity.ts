type Role = 'admin' | 'superAdmin';

export class Admin {
  id?: number;
  name: string;
  email: string;
  password: string;
  role?: Role;
}
