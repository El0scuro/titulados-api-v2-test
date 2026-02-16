import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';


@Controller('estudiante')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Post('uno')
  create(@Body() createEstudianteDto: CreateEstudianteDto) {
    return this.estudianteService.create(createEstudianteDto);
  }
  @Post('varios')
  createPack(@Body() createEstudiantesDto: CreateEstudianteDto[]){
    return this.estudianteService.createMany(createEstudiantesDto);
  }

  @Get('todos')
  findAll() {
    return this.estudianteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
  return this.estudianteService.findOne(id);
}
  
  @Patch('actualizar/:rut')
  update(
    @Param('rut') rut: string,
    @Body() dto: UpdateEstudianteDto,
  ) {
    return this.estudianteService.update(rut, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estudianteService.remove(+id);
  }
}
