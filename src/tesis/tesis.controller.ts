import {
  Controller, Get, Post,
  UploadedFile, UseInterceptors,
  Body, Res, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { Express } from 'express';
import { join } from 'path';
import * as fs from 'fs';
import * as path from 'path';
import { ArchivosService } from './tesis.service';
import { Req } from '@nestjs/common';
import { Request } from 'express';
import { Tesis } from './entities/tesis.entity';
interface UploadRequest extends Request {
  body: {
    mail: string;
    tipo: string;
  };
  rep: number;
  nombreFinal: string;
}
@Controller('tesis')
export class ArchivosController {
constructor(private readonly archivosService: ArchivosService){}

  @Get('todas')
  findAll(){
    return this.archivosService.findAll();
  }

  @Post('Tesis')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'src/archivos/archivos_tesis',
        filename: async (
          req: UploadRequest,
          file: Express.Multer.File,
          cb: (error: Error | null, filename: string) => void
        ) => {
          const mail = req.body.mail || 'anon';
          const partMail = mail.replace(/[^a-zA-Z0-9]/g, '_');
          let fileName = `${partMail}-${file.originalname}`;
          req.rep = 0;
          req.nombreFinal = fileName;
          const carpeta = path.join(
          process.cwd(),
          'src/archivos/archivos_tesis'
          );
          const archivos = fs.readdirSync(carpeta);
          let ruta;
          
          for(let i = 0; i < archivos.length; i++){
            const sin_punto = archivos[i].split(".")[0];
              if(fileName === archivos[i] || 
                (fileName.length > archivos[i].length && fileName.includes(sin_punto))){
              const nombre = archivos[i];
              ruta = path.join(
              process.cwd(),
              'src/archivos/archivos_tesis',
              nombre
              );
              await fs.promises.unlink(ruta);
              req.rep = 1;
              fileName = nombre;
              cb(null, fileName);
              
            }
                    }
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
  
  @Get(':mail')
  async getArchivo(
    @Param('mail') mail: string,
    @Res () res: Response) {
    const nombres: Tesis[] = await this.archivosService.findAll();
    const partMail = mail.replace(/[^a-zA-Z0-9]/g, '_');
    let nombreTesis;
    for(let i = 0; i < nombres.length; i++){
      if(nombres[i].nombreArchivo.includes(partMail)){
        nombreTesis = nombres[i].nombreArchivo;
      }
    }
    const fullPath = join(
      process.cwd(),
      'src',
      'archivos',
      'archivos_Tesis',
      nombreTesis
    );

    if (!fs.existsSync(fullPath)) {
      return res.status(404).send('Archivo no encontrado');
    }

    res.download(fullPath, `${nombreTesis}`);
  }
  
}
