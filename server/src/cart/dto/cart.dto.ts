import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCartDto {
    @ApiProperty({ example: 'google.com', description: 'Domain name' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 1, description: 'Registration period' })
    @IsNumber()
    @IsNotEmpty()
    regPeriod: number;

    @ApiProperty({ example: 14800.00, description: 'Price' })
    @IsNumber()
    @IsNotEmpty()
    price: number;

    @ApiPropertyOptional({ example: ['ns1.google.com', 'ns2.google.com'], description: 'Nameservers' })
    @IsArray()
    @IsOptional()
    nameservers?: string[];
}

export class UpdateCartDto extends PartialType(CreateCartDto) { }
