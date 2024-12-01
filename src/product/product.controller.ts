import {
  Controller,
  Post,
  Get,
  Put,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@IsPublic()
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('create')
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return await this.productService.create(createProductDto);
  }

  @Put('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return await this.productService.update(id, updateProductDto);
  }

  //produto não pode ser removido se ainda estiver relacionado a um pedido
  @Delete('remove/:id/:name')
  async remove(@Param('id') id: string, @Param('name') name: string) {
    return await this.productService.remove(id, name);
  }

  @Get('find-all')
  async findAll() {
    return await this.productService.findAll();
  }

  @Get('find-oneId/:id')
  async findOneId(@Param('id') id: string) {
    return await this.productService.findOneId(id);
  }

  @Get('find-oneName/:name')
  async findOneName(@Param('name') name: string) {
    return await this.productService.findOneName(name);
  }
}

//colar: Colar Parma
//c16f931aa94dbaad6f083b120d6a3515

/*solução para remover produtos:
model Product {
  id        String         @id
  name      String
  price     Decimal
  stock     Int
  orders    OrderProduct[] @relation(onDelete: Cascade) // Delete em cascata
}

model OrderProduct {
  orderId   String
  productId String
  amount    Int
  price     Decimal
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade) // Cascade aqui também
}

service:
async remove(id: string, name: string): Promise<void> {
    const product = await this.prisma.product.findUnique({
        where: { id },
    });

    if (!product || product.name !== name) {
        throw new Error('Erro ao remover produto: nome não corresponde.');
    }

    // Remover as referências na tabela de `order_product`
    await this.prisma.orderProduct.deleteMany({
        where: { productId: id },
    });

    // Agora que as referências foram removidas, pode excluir o produto
    await this.prisma.product.delete({
        where: { id },
    });
}

*/
