export interface UserFromJwt {
  id: number;
  email: string;
  name: string;
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
}
