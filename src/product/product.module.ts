import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [ProductService],
  controllers: [ProductController],
  imports: [PrismaModule],
  exports: [ProductService]
})

export class ProductModule {}
