import { Controller, Post, Get, Put, Body, Param, Delete } from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { ProductService } from './product.service'
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity'

@IsPublic()
@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) {}

    
    @Get('find-all')
    async findAll() {
        return this.productService.findAll;
    }

    @Post('create')
    async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
        return this.productService.create(createProductDto);    
    }

    //verificcar se está certo (update que esta recebendo dois parametro no service)
    @Put('update/:id')
    async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Promise<Product> {
        return this.productService.update(updateProductDto.id, updateProductDto);
    }

    @Delete('remove/:id')
    async remove(@Param('id') id: string, @Param('name') name: string) {
        this.productService.remove(id, name);
    }
}
