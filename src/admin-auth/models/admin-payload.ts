type Role = 'admin' | 'superAdmin';

export interface AdminPayload {
  id?: number;
  name: string;
  email: string;
  role?: Role;
}
