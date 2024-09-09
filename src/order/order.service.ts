import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as crypto from 'crypto';
import { CreateOrderDto } from './dto/order.dto';
import { Order } from '@prisma/client';

@Injectable()
export class OrderService {
    constructor(private readonly prisma: PrismaService) {}

    private createHashOrder (userId: number, date: Date) {
        const data = `${userId}:${date.toISOString}`;
        return crypto.createHash('md5').update(data).digest('hex');
    }

    async createOrder(orderDto: CreateOrderDto): Promise<Order> {
        const { products, ...orderData } = orderDto;
    
        const order = await this.prisma.$transaction(async (prisma) => {
            
            const productIds = products.map(product => product.productId);
            const existingProducts = await prisma.product.findMany({
                where: { id: { in: productIds } }
            });
            
            if (existingProducts.length !== products.length) {
                throw new NotFoundException('Alguns produtos não foram encontrados.');
            }
    
            products.forEach(product => {
                const existingProduct = existingProducts.find(p => p.id === product.productId);
                if (!existingProduct || existingProduct.stock < product.amount) {
                    throw new Error(`Estoque insuficiente para o produto ${product.productId}.`);
                } 
            });
    
            for (const product of products) { // Atualiza o estoque dos produtos
                const existingProduct = existingProducts.find(p => p.id === product.productId);
                await prisma.product.update({
                    where: { id: existingProduct.id },
                    data: { stock: existingProduct.stock - product.amount }
                });
            }
    
            const orderPrice = products.reduce((total, product) => {
                const existingProduct = existingProducts.find(p => p.id === product.productId);
                return total + (existingProduct.price * product.amount);
            }, 0);
    
            const newOrder = await prisma.order.create({
                data: { 
                    userId: orderData.userId,
                    price: orderPrice
                },
            });
            
            const orderProducts = products.map(product => {
                const existingProduct = existingProducts.find(p => p.id === product.productId);
                return {
                    orderId: newOrder.id,
                    amount: product.amount,
                    productPrice: existingProduct.price, 
                    productId: existingProduct.id,
                    productName: existingProduct.name,
                    productType: existingProduct.type
                };
            });
    
            await prisma.orderProduct.createMany({
                data: orderProducts,
            });
    
            return newOrder;
        });
    
        return order;
    }    
   
    async findAll(): Promise<Order[]> {
        return this.prisma.order.findMany();
    }

    async findOneId(id:string): Promise<Order> {
        return this.prisma.order.findUnique({ where: {id} })
    }

    async findManyUserId(userId: number): Promise<Order[]> {
        return this.prisma.order.findMany({ where: { userId } });
    }
}


/*async createOrder(orderDto: CreateOrderDto): Promise<Order> {
        const products = await this.prisma.product.findUnique({
            where: { id: .productId }
        });
        
        if(!products) {
            throw new NotFoundException('Produto não encontrado.');
        }

        if(products.stock < orderDto.amount) {
            throw new Error('Estoque insuficiente.');
        } 

        return {
            productId: orderDto.id,
            amount: orderDto.amount,
            price: orderDto.price,
            orderId: order
        }

        await this.prisma.product.update({
            where: { id: orderDto.productId },
            data: { stock: product.stock - orderDto.amount}
        });

        const calcPrice = product.price * orderDto.amount;

        //id devem ser iguais para a mesma compra
        const order = {
            id: this.createHashOrder(orderDto.userId, new Date()),
            userId: orderDto.userId,
            productId: orderDto.productId,
            amount: orderDto.amount,
            price: calcPrice,
            purchaseDate: new Date(),
        };
     
        const createdOrder = await this.prisma.order.create({
            data: order
          });


        return createdOrder;
    }/*

    /*import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as crypto from 'crypto';
import { CreateOrderDto } from './dto/order.dto';
import { Order, Product } from '@prisma/client';

@Injectable()
export class OrderService {
    constructor(private readonly prisma: PrismaService) {}

    private createHashOrder(userId: number, date: Date): string {
        const data = `${userId}:${date.toISOString()}`;
        return crypto.createHash('md5').update(data).digest('hex');
    }

    async create(orderDto: CreateOrderDto): Promise<Order> {
        const products = await Promise.all(
            orderDto.products.map(async (productDto) => {
                const product = await this.prisma.product.findUnique({
                    where: { id: productDto.productId }
                });

                if (!product) {
                    throw new NotFoundException(`Produto com ID ${productDto.productId} não encontrado.`);
                }

                if (product.stock < productDto.amount) {
                    throw new Error(`Estoque insuficiente para o produto ${productDto.productId}.`);
                }

                return {
                    productId: productDto.productId,
                    amount: productDto.amount,
                    price: product.price * productDto.amount
                };
            })
        );

        await Promise.all(
            products.map(product => 
                this.prisma.product.update({
                    where: { id: product.productId },
                    data: { stock: { decrement: product.amount } }
                })
            )
        );

        const order = {
            id: this.createHashOrder(orderDto.userId, new Date()),
            userId: orderDto.userId,
            purchaseDate: new Date(),
            price: products.reduce((total, p) => total + p.price, 0),
            products: {
                create: products
            }
        };

        const createdOrder = await this.prisma.order.create({
            data: order,
            include: { products: true } // Incluindo produtos na resposta
        });

        return createdOrder;
    }

    async findAll(): Promise<Order[]> {
        return this.prisma.order.findMany({
            include: { products: true }
        });
    }

    async findOneId(id: string): Promise<Order> {
        return this.prisma.order.findUnique({
            where: { id },
            include: { products: true }
        });
    }

    async findManyUserId(userId: number): Promise<Order[]> {
        return this.prisma.order.findMany({
            where: { userId },
            include: { products: true }
        });
    }
}
 */