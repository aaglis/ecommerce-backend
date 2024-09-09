import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { OrderProduct } from '../../order/entities/orderProduct.entity';

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

    @OneToMany(() => OrderProduct, orderProduct => orderProduct.product)
    orderProducts?: OrderProduct[];
}
