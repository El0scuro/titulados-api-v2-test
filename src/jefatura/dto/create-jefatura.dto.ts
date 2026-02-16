import { IsString } from "class-validator";

export class CreateJefaturaDto {
    @IsString()
    mail: string;
    
    @IsString()
    nombre: string;
    
    @IsString()
    apellido: string;
    
    @IsString()
    sede: string ;

}
