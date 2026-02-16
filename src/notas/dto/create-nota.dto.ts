import {IsOptional, IsString } from "class-validator";

export class CreateNotaDto {
    @IsString()
    id: string;
    @IsString()
    mailEstudiante: string;
    @IsOptional()
    @IsString()
    notaGuia?: string;
    @IsOptional()
    @IsString()
    notaInformante?: string;
    @IsOptional()
    @IsString()
    notaTesis?: string ;
    @IsOptional()
    @IsString()
    notaFinal?: string;
}
