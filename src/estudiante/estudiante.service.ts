import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Estudiante} from "./entities/estudiante.entity"
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { NotasService } from 'src/notas/notas.service';
@Injectable()
export class EstudianteService {
  constructor(
    private readonly notaService: NotasService,
    @InjectRepository(Estudiante) 
    private readonly estudianteRepo: Repository<Estudiante>
    ){}
    

  async create(createEstudianteDto: CreateEstudianteDto): Promise<Estudiante> {
    const estudiante = this.estudianteRepo.create(createEstudianteDto);
    return await this.estudianteRepo.save(estudiante);
  }

  async createMany(estudiantes: CreateEstudianteDto[]) {
  for (const estudiante of estudiantes) {
    try {
      const entity = this.estudianteRepo.create(estudiante);
      await this.estudianteRepo.save(entity);
      await this.notaService.create(estudiante.mail);
    } catch (error) {
      console.error('Error en estudiante:', estudiante);
      throw error; // o manejarlo sin cortar todo
    }
  }

  return { ok: true };
}


  async findAll() {
    const estudiantes: Estudiante[] = await this.estudianteRepo.find();
    if(!estudiantes){
      return null;
    }
    return estudiantes;
  }

  async findOne(id: string) {
    const estudiante = await this.estudianteRepo.findOneBy({mail: id});
    console.log(estudiante)
    if (!estudiante) {
    return null;
  }
  
    return estudiante;
  }


  async update(rut: string, dto: UpdateEstudianteDto) {
    
    const data = Object.fromEntries(
    Object.entries(dto).filter(([_, v]) => v !== undefined)
  );
  const result = await this.estudianteRepo.update({ rut }, data);
  return this.estudianteRepo.findOne({ where: { rut } });
}


  remove(id: number) {
    return `This action removes a #${id} estudiante`;
  }
}
