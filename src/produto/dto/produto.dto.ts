// src/produto/dto/produto.dto.ts
export class CreateProdutoDto {
    readonly nome: string;
    readonly preco: number;
    readonly descricao?: string;
  }
  
  export class UpdateProdutoDto {
    readonly nome?: string;
    readonly preco?: number;
    readonly descricao?: string;
  }
  