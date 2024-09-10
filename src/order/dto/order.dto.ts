import { IsNumber,  IsNotEmpty, IsArray, ValidateNested } from "class-validator";
import { Order } from "../entities/order.entity";
import { Type } from "class-transformer";
import { CreateOrderProductDto } from "./orderProduct.dto";

export class CreateOrderDto extends Order {

    @IsNotEmpty()
    @IsNumber()
    readonly userId: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateOrderProductDto)
    readonly products: CreateOrderProductDto[];
    
}