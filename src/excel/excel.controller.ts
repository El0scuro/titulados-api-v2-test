import { Body, Controller, Post, Res} from '@nestjs/common';
import { ExcelService } from './excel.service';
import { Response } from 'express';

@Controller('excel')
export class ExcelController {
constructor(private readonly excelService: ExcelService){}

@Post('reporte')
async descargar(@Res() res: Response, @Body() datos: any[]) {
  const buffer = await this.excelService.completarConArray(datos);

  res.set({
    'Content-Type':
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'Content-Disposition': 'attachment; filename="reporte.xlsx"',
  });

  res.send(buffer);
}

}
