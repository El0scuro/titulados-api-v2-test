import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateEstadoDto } from './dto/update-estado.dto';
import { Repository } from 'typeorm';
import { Estados } from './entities/estado.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EstadosService {
  
  constructor(
    @InjectRepository(Estados)
    private readonly estadoRepo: Repository<Estados>){
  }


  async findAll() {
    const estados: Estados[] = await this.estadoRepo.find();
    if(!estados){
      return null;
    }
    return estados;
  }

  findOne(id: number) {
    return `This action returns a #${id} estado`;
  }

  async update(dto: UpdateEstadoDto) {
      const { mailEstudiante, estado} = dto;
      console.log(dto)
      const state = await this.estadoRepo.findOne({
        where: { mailEstudiante },
      });
      console.log(state)
      if (!state) {
        throw new NotFoundException('Notas no encontradas para el estudiante');
      }
      console.log("antes",state)
      state.estado = estado;
      console.log("despues", state)
  
    return this.estadoRepo.save(state);
  }

  remove(id: number) {
    return `This action removes a #${id} estado`;
  }
}
