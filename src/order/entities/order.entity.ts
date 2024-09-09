import { Entity, Column, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm'
import { OrderProduct } from './orderProduct.entity';
import { User } from '../../user/entities/user.entity'

@Entity('order') 
export class Order {
    @PrimaryColumn()
    id: string;

    @Column()
    userId: number;
    @ManyToOne(() => User, user => user.orders) //relação com user
    user: User;
    
    @Column()
    price: number;

    @Column({type: 'timestamp'})
    purchaseDate: Date;

    @OneToMany(() => OrderProduct, orderProduct => orderProduct.order) // Relação com OrderProduct
    orderProducts: OrderProduct[];
}