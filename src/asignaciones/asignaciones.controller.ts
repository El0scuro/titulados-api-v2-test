import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AsignacionesService } from './asignaciones.service';
import { CreateAsignacioneDto } from './dto/create-asignacione.dto';
import { UpdateAsignacioneDto } from './dto/update-asignacione.dto';

@Controller('asignaciones')
export class AsignacionesController {
  constructor(private readonly asignacionesService: AsignacionesService) {}

  @Post('crear')
  async create(@Body() createAsignacioneDto: CreateAsignacioneDto) {
    try{
      await this.asignacionesService.create(createAsignacioneDto);
      return {ok: true}
    }catch(error){
      return{ok:false}
    }
  }

  @Get('todas')
  findAll() {
    this.asignacionesService.findAll();
    return this.asignacionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.asignacionesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAsignacioneDto: UpdateAsignacioneDto) {
    return this.asignacionesService.update(+id, updateAsignacioneDto);
  }

  @Delete('borrar/:id')
  remove(@Param('id') id: string) {
    return this.asignacionesService.remove(id);
  }
}
