import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Secretario} from "./entities/secretario.entity"
import { CreateSecretarioDto } from './dto/create-secretario.dto';
import { UpdateSecretarioDto } from './dto/update-secretario.dto';

@Injectable()
export class SecretarioService {
  constructor(@InjectRepository(Secretario) 
  private readonly secretarioRepo: Repository<Secretario>) {}

  async create(createSecretarioDto: CreateSecretarioDto): Promise<Secretario> {
      const secretario = this.secretarioRepo.create(createSecretarioDto);
      return await this.secretarioRepo.save(secretario);
    }

  async findAll() {
    const secretarios: Secretario[] = await this.secretarioRepo.find();
    if(!secretarios){
      return null;
    }
    return secretarios;
  }

  async findOne(id: string) {
    const secretario = await this.secretarioRepo.findOneBy({mail: id});
    if (!secretario) {
    // Retorna null si no existe
    return null;
  }
    return secretario;
  }
  update(id: number, updateSecretarioDto: UpdateSecretarioDto) {
    return `This action updates a #${id} secretario`;
  }

  remove(id: string) {
    console.log(id)
    return this.secretarioRepo.delete(id);
  }
}
