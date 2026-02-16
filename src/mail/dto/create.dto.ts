import {
  IsString,
  IsOptional,
  IsArray,
} from "class-validator";
export class CreateMailDto {
    @IsString()
    toMail: string;

    @IsString()
    subject: string;

    @IsString()
    text: string;

    @IsOptional()
    @IsArray()
    rutas: string[];

    @IsOptional()
    @IsArray()
    archivos: string[];
    
}
