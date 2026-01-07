import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Estudiante} from "./entities/estudiante.entity"
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';

@Injectable()
export class EstudianteService {
  constructor(@InjectRepository(Estudiante) private readonly estudianteRepo: Repository<Estudiante>) {}
  create(createEstudianteDto: CreateEstudianteDto) {
    return 'This action adds a new estudiante';
  }

  async findAll() {
    const estudiantes = await this.estudianteRepo.find();
    if(!estudiantes){
      return null;
    }
    return estudiantes;
  }

  async findOne(id: string) {
    const estudiante = await this.estudianteRepo.findOneBy({mail: id});
    if (!estudiante) {
    // Retorna null si no existe
    return null;
  }
    return estudiante;
  }


  update(id: number, updateEstudianteDto: UpdateEstudianteDto) {
    return `This action updates a #${id} estudiante`;
  }

  remove(id: number) {
    return `This action removes a #${id} estudiante`;
  }
}
