// src/word/word.service.ts
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';

@Injectable()
export class WordService {

  descargarActa(data: {
    nombre: string;
    notaGuia: string;
    notaInformante: string;
    notaFinal: string;
    fecha: string;
  }): Buffer {

    //Ruta a la plantilla
    const templatePath = path.join(
      process.cwd(),
      'src',
      'archivos',
      'actas',
      'plantilla.docx',
    );

    //Leer plantilla
    const content = fs.readFileSync(templatePath, 'binary');

    //Cargar zip
    const zip = new PizZip(content);

    //Crear documento
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      nullGetter: () => '',
    });

    //Inyectar datos
    doc.render(data);

    //Generar buffer
    return doc.getZip().generate({
      type: 'nodebuffer',
      compression: 'DEFLATE',
    });
  }
}