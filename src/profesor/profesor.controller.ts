import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { CreateProfesorDto } from './dto/create-profesor.dto';

@Controller('profesor')
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}

  @Post('crear')
  create(@Body() createProfesorDto: CreateProfesorDto) {
    return this.profesorService.create(createProfesorDto);
  }

  @Get('todos')
  findAll() {
    return this.profesorService.findAll();
  }

  @Get(':id')
findOne(@Param('id') id: string) {
  return this.profesorService.findOne(id); // ahora id sigue siendo string
}

  @Delete('borrar/:id')
  remove(@Param('id') id: string) {
    return this.profesorService.remove(id);
  }
}
