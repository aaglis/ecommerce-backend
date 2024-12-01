import { OneToMany } from "typeorm";
import { Order } from "../../order/entities/order.entity";

export class User {
  id?: number;
  name: string;
  firstName: string;
  lastName: string;
  alias: string;
  cpf: string;
  dateOfBirth: Date;
  phone: string;
  email: string;
  password: string;
  cep?: string;
  streetName?: string;
  city?: string;
  neighborhood?: string;
  state?: string;
  residenceNumber?: string;
  @OneToMany(() => Order, order => order.user)
  orders?: Order[];
}
