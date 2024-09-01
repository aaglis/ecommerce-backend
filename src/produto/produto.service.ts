// src/produto/produto.service.ts
import { Injectable } from '@nestjs/common';
import { CreateProdutoDto, UpdateProdutoDto } from './dto/produto.dto';

@Injectable()
export class ProdutoService {
  private readonly produtos = []; // Exemplo de armazenamento em memória

  create(createProdutoDto: CreateProdutoDto) {
    const novoProduto = { id: Date.now().toString(), ...createProdutoDto };
    this.produtos.push(novoProduto);
    return novoProduto;
  }

  findAll() {
    return this.produtos;
  }

  findById(id: string) {
    return this.produtos.find(produto => produto.id === id);
  }

  update(id: string, updateProdutoDto: UpdateProdutoDto) {
    const produtoIndex = this.produtos.findIndex(produto => produto.id === id);
    if (produtoIndex === -1) {
      return null;
    }
    this.produtos[produtoIndex] = { ...this.produtos[produtoIndex], ...updateProdutoDto };
    return this.produtos[produtoIndex];
  }

  remove(id: string) {
    const produtoIndex = this.produtos.findIndex(produto => produto.id === id);
    if (produtoIndex === -1) {
      return false;
    }
    this.produtos.splice(produtoIndex, 1);
    return true;
  }
}
