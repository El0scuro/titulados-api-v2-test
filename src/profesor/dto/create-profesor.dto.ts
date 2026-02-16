import { IsString } from "class-validator";
export class CreateProfesorDto {
    
    @IsString()
    nombre: string;
    @IsString()
    segundoNombre: string;
    @IsString()
    apellido: string;
    @IsString()
    segundoApellido: string;
    @IsString()
    mail:string;
    @IsString()
    sede: string;
}
