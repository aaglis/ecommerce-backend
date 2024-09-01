// src/produto/produto.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, HttpStatus, HttpException, Res } from '@nestjs/common';
import { Response } from 'express';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto, UpdateProdutoDto } from './dto/produto.dto';

@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  async createProduto(@Body() createProdutoDto: CreateProdutoDto, @Res() res: Response) {
    try {
      const novoProduto = await this.produtoService.create(createProdutoDto);
      return res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        data: novoProduto,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async getAllProdutos(@Res() res: Response) {
    try {
      const produtos = await this.produtoService.findAll();
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: produtos,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getProdutoById(@Param('id') id: string, @Res() res: Response) {
    try {
      const produto = await this.produtoService.findById(id);
      if (!produto) {
        throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);
      }
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: produto,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async updateProduto(@Param('id') id: string, @Body() updateProdutoDto: UpdateProdutoDto, @Res() res: Response) {
    try {
      const produtoAtualizado = await this.produtoService.update(id, updateProdutoDto);
      if (!produtoAtualizado) {
        throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);
      }
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        data: produtoAtualizado,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async deleteProduto(@Param('id') id: string, @Res() res: Response) {
    try {
      const resultado = await this.produtoService.remove(id);
      if (!resultado) {
        throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);
      }
      return res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
