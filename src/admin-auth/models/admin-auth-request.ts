import { Admin } from 'src/admin/entities/admin.entity';

export interface AdminAuthRequest extends Request {
  admin: Admin;
}
