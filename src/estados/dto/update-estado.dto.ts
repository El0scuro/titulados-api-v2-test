import { IsEnum, IsString } from 'class-validator';

export enum TipoEstado {
  APROBADO = 'aceptado',
  PENDIENTE = 'pendiente',
  REPROBADO = 'rechazado',
}

export class UpdateEstadoDto {
  @IsString()
  mailEstudiante: string;

  @IsEnum(TipoEstado)
  estado: TipoEstado;
}
