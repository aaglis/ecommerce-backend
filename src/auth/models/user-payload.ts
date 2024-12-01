export interface UserPayload {
  id?: number;
  name: string;
  email: string;
  alias: string;
  cpf: string;
  dateOfBirth: Date;
  phone: string;
  cep?: string;
  streetName?: string;
  city?: string;
  neighborhood?: string;
  state?: string;
  residenceNumber?: string;
  iat?: string;
  exp?: string;
}
