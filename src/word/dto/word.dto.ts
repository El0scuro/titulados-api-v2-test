import {
  IsString,
  IsOptional,
} from "class-validator";
export class CreateWordDto{
    @IsString()
    nombre: string;
    @IsString()
    notaGuia: string;
    @IsString()
    notaInformante: string;
    @IsString()
    notaFinal: string;
    @IsOptional()
    @IsString()
    fecha: String;
}