export interface UserFromJwt {
  id: number;
  email: string;
  name: string;
  alias: string,
  cpf: string,
  dateOfBirth: string,
  phone: string,
  cep?: string,
  streetName?: string,
  city?: string,
  residenceNumber?: string,
}
