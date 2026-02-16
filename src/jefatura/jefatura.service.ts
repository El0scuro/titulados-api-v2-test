import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Jefatura} from "./entities/jefatura.entity"
import { CreateJefaturaDto } from './dto/create-jefatura.dto';
import { UpdateJefaturaDto } from './dto/update-jefatura.dto';

@Injectable()
export class JefaturaService {
  constructor(@InjectRepository(Jefatura) private readonly jefaturaRepo: Repository<Jefatura>) {}
  
  async create(createJefaturaDto: CreateJefaturaDto): Promise<Jefatura> {
    const jefatura = this.jefaturaRepo.create(createJefaturaDto);
    return await this.jefaturaRepo.save(jefatura);
  }

  async findAll() {
    const jefaturas: Jefatura[] = await this.jefaturaRepo.find();
    
    if(!jefaturas){
      return null;
    }
    return jefaturas;
  }

  async findOne(id: string) {
    const jefatura = await this.jefaturaRepo.findOneBy({mail: id});
    if (!jefatura) {
    // Retorna null si no existe
    return null;
  }
    
    return jefatura;
  }

  update(id: number, updateJefaturaDto: UpdateJefaturaDto) {
    return `This action updates a #${id} jefatura`;
  }

  remove(id: string) {
    return this.jefaturaRepo.delete(id);
  }
}
