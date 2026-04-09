import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class SearchDomainDto {
    @ApiProperty({ description: "Domain name to search", example: "google.com" })
    @IsString()
    @IsNotEmpty()
    name: string;
}

export class OrderDomainDto extends SearchDomainDto {
    @ApiProperty({ description: "Domain registration period", example: 1 })
    @IsNumber()
    @IsNotEmpty()
    regPeriod: number;

    @ApiProperty({ description: "Domain price", example: 14800.00 })
    @IsDecimal()
    @IsNotEmpty()
    price: number
}

export class UpdateNameserverDto {
    @ApiProperty({ description: "Domain ID", example: "6ebac467-7340-45f3-90fc-9f59eb0c217a" })
    @IsString()
    @IsNotEmpty()
    domainId: string

    @ApiProperty({ description: "Nameserver 1", example: "ns1.google.com" })
    @IsString()
    @IsNotEmpty()
    nameserver1: string;

    @ApiProperty({ description: "Nameserver 2", example: "ns2.google.com" })
    @IsString()
    @IsNotEmpty()
    nameserver2: string;

    @ApiPropertyOptional({ description: "Nameserver 3", example: "ns3.google.com" })
    @IsString()
    @IsOptional()
    nameserver3?: string;

    @ApiPropertyOptional({ description: "Nameserver 4", example: "ns4.google.com" })
    @IsString()
    @IsOptional()
    nameserver4?: string;
}
