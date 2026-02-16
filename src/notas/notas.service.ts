import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotaDto } from './dto/create-nota.dto';
import { UpdateNotaDto } from './dto/update-nota.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Notas } from './entities/nota.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotasService {
  constructor(@InjectRepository(Notas)
  private readonly notaRepo: Repository<Notas>){}

  create(mailEstudiante: string) {
    const nota = this.notaRepo.create({
      mailEstudiante: mailEstudiante,
      notaGuia: null,
      notaInformante: null,
      notaExamenOral: null,
      notaTesis: null,
      notaFinal: null
    })
    return this.notaRepo.save(nota);
  }

  async findAll() {
    const notas = await this.notaRepo.find();
    if(!notas){
      return null;
    }
    return notas;
  }

  findOne(id: number) {
    return `This action returns a #${id} nota`;
  }

  async update(dto: UpdateNotaDto) {
    const { mailEstudiante, tipoNota, valor } = dto;

    const nota = await this.notaRepo.findOne({
      where: { mailEstudiante },
    });

    if (!nota) {
      throw new NotFoundException('Notas no encontradas para el estudiante');
    }

    nota[tipoNota] = valor.toString();

  return this.notaRepo.save(nota);
}


  remove(id: number) {
    return `This action removes a #${id} nota`;
  }
}
