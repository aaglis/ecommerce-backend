import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { Order } from './order.entity';

@Entity('order_product') 
export class OrderProduct {
    @PrimaryColumn()
    orderId: string;
   
    @ManyToOne(() => Order, order => order.id)  // Ajuste conforme seu relacionamento
    @JoinColumn({ name: 'orderId' })
    order: Order;

    @PrimaryColumn()  // Usado como parte da chave primária composta
    productId: string;
    
    @ManyToOne(() => Product, product => product.id)  // Ajuste conforme seu relacionamento
    @JoinColumn({ name: 'productId' })
    product: Product;

    @Column()
    amount: number;
    
    @Column('decimal', { precision: 10, scale: 2 }) 
    price: number;
}
