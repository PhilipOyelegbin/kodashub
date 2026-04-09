import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDecimal, IsNotEmpty, IsString } from "class-validator";

export class SearchDomainDto {
    @ApiProperty({ description: "Domain name to search", example: "google.com" })
    @IsString()
    @IsNotEmpty()
    name: string;
}

export class OrderDomainDto extends SearchDomainDto {
    @ApiProperty({ description: "Domain registration period", example: "1" })
    @IsString()
    @IsNotEmpty()
    regperiod: string;

    @ApiProperty({ description: "Domain price", example: 14800.00 })
    @IsDecimal()
    @IsNotEmpty()
    price: number
}

export class RegisterDomainDto extends SearchDomainDto {
    @ApiProperty({ description: "Domain registration period", example: "1" })
    @IsString()
    @IsNotEmpty()
    regperiod: string;

    @ApiProperty({ description: "Domain nameservers", example: ["nsa.whogohost.com", "nsb.whogohost.com"] })
    @IsArray()
    @IsNotEmpty()
    nameservers: string[];
}
