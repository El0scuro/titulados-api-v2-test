// excel.service.ts
import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import * as path from 'path';

@Injectable()
export class ExcelService {

  async completarConArray(personas: any[]) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile('src/archivos/reporte_estudiantes/plantilla.xlsx');

  const sheet = workbook.getWorksheet('Hoja1');

  let fila = 2;

  personas.forEach(p => {
    sheet.getCell(`A${fila}`).value = p.numero;
    sheet.getCell(`B${fila}`).value = p.semestre;
    sheet.getCell(`C${fila}`).value = p.alumno;
    sheet.getCell(`D${fila}`).value = p.rut;
    sheet.getCell(`E${fila}`).value = p.codCarrera;
    sheet.getCell(`F${fila}`).value = p.ingreso;
    sheet.getCell(`G${fila}`).value = p.egreso;
    sheet.getCell(`H${fila}`).value = p.fechaExamen;
    sheet.getCell(`I${fila}`).value = p.horaExamen;
    sheet.getCell(`J${fila}`).value = p.mailEstudiante;
    sheet.getCell(`K${fila}`).value = p.celular;
    sheet.getCell(`L${fila}`).value = p.guia;
    sheet.getCell(`M${fila}`).value = p.informante;
    sheet.getCell(`N${fila}`).value = p.presidente;
    sheet.getCell(`O${fila}`).value = p.secretario;
    sheet.getCell(`P${fila}`).value = p.tesis;
    sheet.getCell(`Q${fila}`).value = p.notaGuia;
    sheet.getCell(`R${fila}`).value = p.notaInformante;
    sheet.getCell(`S${fila}`).value = p.notaTesis;
    sheet.getCell(`T${fila}`).value = p.notaDefensa;
    sheet.getCell(`U${fila}`).value = p.notaFinal;
    fila++;
  });

  return workbook.xlsx.writeBuffer();
  }

}
