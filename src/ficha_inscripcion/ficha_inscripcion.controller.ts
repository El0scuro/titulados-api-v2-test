import {
  Controller, Get, Post,
  UploadedFile, UseInterceptors,
  Body, Res, Put, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { Express } from 'express';
import { join } from 'path';
import * as fs from 'fs';
import * as path from 'path';
import { ArchivosService } from './ficha_inscripcion.service';
import { Req } from '@nestjs/common';
import { Request } from 'express';

interface UploadRequest extends Request {
  body: {
    mail: string;
    tipo: string;
  };
  rep: number;
  nombreFinal: string;
}

@Controller('ficha')
export class ArchivosController {
constructor(private readonly archivosService: ArchivosService){}

  @Put(':id')
  actualizar(
    @Param('id') id: number,
    @Body() body: any
  ){
    return this.archivosService.actualizarUsuario(id, body); 
  }

  @Get('todas')
  findAll(){
    return this.archivosService.findAll();
  }

  @Post('ficha_inscripcion')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'src/archivos/fichas_inscripcion',
        filename: async (
          req: UploadRequest,
          file: Express.Multer.File,
          cb: (error: Error | null, filename: string) => void
        ) => {
          const mail = req.body.mail || 'anon';
          const partMail = mail.replace(/[^a-zA-Z0-9]/g, '_');
          let fileName = `${partMail}-${file.originalname}`;
          req.rep = 0;
          const carpeta = path.join(
          process.cwd(),
          'src/archivos/fichas_inscripcion'
          );
          const archivos = fs.readdirSync(carpeta);
          let ruta: any;
          
          for(let i = 0; i < archivos.length; i++){
              const sin_punto = archivos[i].split(".")[0];
              if(fileName === archivos[i] || 
                (fileName.length > archivos[i].length && fileName.includes(sin_punto))){
                const nombre = archivos[i];
                ruta = path.join(
                process.cwd(),
                'src/archivos/fichas_inscripcion',
                nombre
                );
                await fs.promises.unlink(ruta);
                req.rep = 1;
                fileName = nombre;
                cb(null, fileName);
                
              }
          }
          
          req.nombreFinal = fileName;
          if(req.rep === 0){
            cb(null, fileName);
          }
          
        },
        
      }),
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('mail') mail: string,
    @Req() req: any
  ) {
    if(req.rep === 1){
      await this.archivosService.borrarRegistro(req.nombreFinal);
    }
    await this.archivosService.crearRegistro(mail, req.nombreFinal, file.path);
    return {ok: true};
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

    res.download(fullPath, 'Formulario Inscripción Seminario de Título.docx');
  }

  
  
}
