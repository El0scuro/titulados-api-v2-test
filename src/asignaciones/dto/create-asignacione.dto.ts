import { IsDate, IsEnum, IsOptional, IsString } from "class-validator";

export class CreateAsignacioneDto {
    @IsString()
    mailEstudiante: string;
    @IsString()
    mailProfesor: string;
    @IsEnum(["informante", "guia", "presidente", "secretario"])
    rol: "informante" | "guia" | "presidente" | "secretario";
    @IsOptional()
    @IsDate()
    fechaAsignacion?: Date;
}
