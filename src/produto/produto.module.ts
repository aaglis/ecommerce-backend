// src/produto/produto.module.ts
import { Module } from '@nestjs/common';
import { ProdutoController } from './produto.controller';
import { ProdutoService } from './produto.service';

@Module({
  controllers: [ProdutoController],
  providers: [ProdutoService],
  exports: [ProdutoService], // Se necessário para compartilhar com outros módulos
})
export class ProdutoModule {}
