// src/word/word.controller.ts
import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { WordService } from './word.service';
import { CreateWordDto } from './dto/word.dto';

@Controller('word')
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @Post('acta')
  descargarFicha(@Res() res: Response, @Body() wordDto: CreateWordDto) {
  const fecha = new Date();
  const formateada = fecha.toLocaleString('es-CL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

    const buffer = this.wordService.descargarActa({
      ...wordDto,
      fecha: formateada,
    });

    res.setHeader(
      'Content-Disposition',
      'attachment; filename="plantilla.docx"',
    );
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    );

    res.send(buffer);
  }
}