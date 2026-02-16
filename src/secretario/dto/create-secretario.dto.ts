import {IsString } from "class-validator";

export class CreateSecretarioDto {
    
    @IsString()
    mail: string;
    
    @IsString()
    nombre: string;
    
    @IsString()
    apellido: string;
    
    @IsString()
    sede: string;
    
    
    
}
