import { IsString, IsNumber, IsNotEmpty, IsIn, Min } from "class-validator";
import { Product } from "../entities/product.entity";


export class CreateProductDto extends Product { //o algoritmo do id-hash deve ser implementado
    /*
    @IsNotEmpty()
    @IsString()
    readonly id: string;
    */
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    @IsIn(['colar', 'pulseira', 'anel']) //restringe tipo
    readonly type: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    readonly price: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    readonly stock: number;
} 
