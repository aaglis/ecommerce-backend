type Role = 'admin' | 'superAdmin';

export interface AdminFromJwt {
  id?: number;
  name: string;
  email: string;
  role?: Role;
}
