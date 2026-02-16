import { Injectable } from '@nestjs/common';
import { CreateAsignacioneDto } from './dto/create-asignacione.dto';
import { UpdateAsignacioneDto } from './dto/update-asignacione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignaciones } from './entities/asignacione.entity';

@Injectable()
export class AsignacionesService {
  constructor(@InjectRepository(Asignaciones) 
    private readonly asignacionRepo: Repository<Asignaciones>,
  ) {}
    
  async create(createAsignacioneDto: CreateAsignacioneDto) {
    try{
      const fechaHoy = new Date();

      const asignacion = this.asignacionRepo.create({
        mailEstudiante: createAsignacioneDto.mailEstudiante,
        mailProfesor: createAsignacioneDto.mailProfesor,
        rol: createAsignacioneDto.rol,
        fechaAsignacion: fechaHoy
      });
      console.log(asignacion)
      return await this.asignacionRepo.save(asignacion);
    } catch (error) {
      console.log('error', error);
      throw error;
    }
    
  }

  async findAll() {
    const asignaciones = await this.asignacionRepo.find();
    if(!asignaciones){
      return null;
    }
    return asignaciones;
  }

  findOne(id: number) {
    return `This action returns a #${id} asignacione`;
  }

  update(id: number, updateAsignacioneDto: UpdateAsignacioneDto) {
    return `This action updates a #${id} asignacione`;
  }

  async remove(id: string) {
    return this.asignacionRepo.delete(id);
  }
}
