import { Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import { NotasService } from './notas.service';
import { UpdateNotaDto } from './dto/update-nota.dto';

@Controller('notas')
export class NotasController {
  constructor(private readonly notasService: NotasService) {}

  @Get('todas')
  findAll() {
    return this.notasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notasService.findOne(+id);
  }

  @Patch('actualizar')
  updateNota(@Body() dto: UpdateNotaDto) {
  return this.notasService.update(dto);
}




  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notasService.remove(+id);
  }
}
