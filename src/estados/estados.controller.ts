import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstadosService } from './estados.service';
import { UpdateEstadoDto } from './dto/update-estado.dto';

@Controller('estados')
export class EstadosController {
  constructor(private readonly estadosService: EstadosService) {}

  @Get('todos')
  findAll() {
    return this.estadosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estadosService.findOne(+id);
  }

  @Patch('actualizar')
    updateEstado(@Body() dto: UpdateEstadoDto) {
    console.log("controleerr")
    return this.estadosService.update(dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estadosService.remove(+id);
  }
}
