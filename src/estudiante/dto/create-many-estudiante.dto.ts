import { Type } from "class-transformer";
import {
  IsArray,
  ValidateNested
} from "class-validator";

import { CreateEstudianteDto } from "./create-estudiante.dto";

export class CreateManyEstudiantesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateEstudianteDto)
  estudiantes: CreateEstudianteDto[];
}
