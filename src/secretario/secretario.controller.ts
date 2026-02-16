import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { SecretarioService } from './secretario.service';
import { CreateSecretarioDto } from './dto/create-secretario.dto';
import { UpdateSecretarioDto } from './dto/update-secretario.dto';
import { Response } from 'express';
import { join } from 'path';
import * as fs from 'fs';
@Controller('secretario')
export class SecretarioController {
  constructor(private readonly secretarioService: SecretarioService) {}
  
  @Post('crear')
    create(@Body() createSecretarioDto: CreateSecretarioDto) {
      return this.secretarioService.create(createSecretarioDto);
    }

  @Get('todos')
  findAll() {
    return this.secretarioService.findAll();
  }
  
  @Get(':path(*)')
    getArchivo(
      @Param('path') filePath: string,
      @Res() res: Response) {
      const fullPath = join(
        process.cwd(),
        'src',
        'archivos',
        filePath
      );
  
      if (!fs.existsSync(fullPath)) {
        return res.status(404).send('Archivo no encontrado');
      }
      console.log(fullPath)
      res.download(fullPath, 'Formulario Inscripción Seminario de Título.docx');
    }

  

  @Get(':id')
findOne(@Param('id') id: string) {
  return this.secretarioService.findOne(id);
}


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSecretarioDto: UpdateSecretarioDto) {
    return this.secretarioService.update(+id, updateSecretarioDto);
  }

  @Delete('borrar/:id')
  remove(@Param('id') id: string) {
    return this.secretarioService.remove(id);
  }
}
