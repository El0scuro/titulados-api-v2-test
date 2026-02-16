import {
  IsString,
  IsOptional,
  IsInt,
} from "class-validator";

export class CreateEstudianteDto {
  @IsString()
  mail: string;

  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  segundoNombre?: string | null;

  @IsString()
  apellido: string;

  @IsOptional()
  @IsString()
  segundoApellido?: string | null;

  @IsString()
  rut: string;

  @IsOptional()
  @IsString()
  codigo?: string | null;

  @IsOptional()
  @IsInt()
  agnoIngreso?: number | null;

  @IsOptional()
  @IsInt()
  agnoEgreso?: number | null;

  @IsOptional()
  @IsString()
  nroResolucion?: string | null;

  @IsOptional()
  @IsString()
  hora?: string | null;

  @IsOptional()
  @IsString()
  fechaExamen?: string | null;

  @IsOptional()
  @IsString()
  sede?: string | null;

  @IsOptional()
  @IsString()
  mailPersonal?: string | null;

  @IsOptional()
  @IsString()
  semestre?: string | null;

  @IsOptional()
  @IsString()
  celular: string | null;
}

