import { Injectable, Param, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService} from '../prisma/prisma.service'
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import * as crypto from 'crypto';


@Injectable()
export class ProductService {
    constructor(private readonly prisma: PrismaService) {} //injeta o prismaService

    private createHashId (type: string, name: string) {
        const data = `${type}:${name}`;
        return crypto.createHash('md5').update(data).digest('hex');
    }

    async create(productDto: CreateProductDto) {
        const product = {
            id: this.createHashId(productDto.type, productDto.name),
            ...productDto
        };
        
        const createdProduct = await this.prisma.product.create({
            data: {
                ...product
            },
        });

        return createdProduct;
    }
    
    async findAll(): Promise<Product[]> {
        return this.prisma.product.findMany();
    }

    async findOneId(id: string): Promise<Product> {
        return this.prisma.product.findUnique({ where: {id} });         
    }

    findOneName(name: string) {
        return this.prisma.product.findUnique({ where: {name} });
    }

    async remove(id: string, name: string): Promise<void> {
        const product = await this.prisma.product.findUnique({ where: { id } });
        
        if(!product) {
            throw new Error('Produto não encontrado.');
        }
        
        if(product.name.toLowerCase() !== name.toLowerCase()) {
            throw new Error ('Erro ao remover produto: nome não corresponde.');
        } 
        
        await this.prisma.product.delete({ where: { id } });
  
    }

    async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
        const product = await this.prisma.product.findUnique({ 
            where: { id } 
        });

        if(!product) {
            throw new Error('Produto não encontrado.');
        }

        const updateProduct = await this.prisma.product.update({
            where: { id },
            data: { ...updateProductDto }
        })

        return updateProduct;
    }
}
