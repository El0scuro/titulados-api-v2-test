import { IsEnum, IsNumber, IsString, Min, Max } from 'class-validator';

export enum TipoNota {
  GUIA = 'notaGuia',
  INFORMANTE = 'notaInformante',
  EXAMEN = 'notaExamenOral',
  TESIS = 'notaTesis',
}

export class UpdateNotaDto {
  @IsString()
  mailEstudiante: string;

  @IsEnum(TipoNota)
  tipoNota: TipoNota;

  @IsNumber()
  @Min(1)
  @Max(7)
  valor: number;
}
