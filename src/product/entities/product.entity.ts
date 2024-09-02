import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('product')
export class Product {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column('decimal')
    price: number;

    @Column('int')
    stock: number;
}
