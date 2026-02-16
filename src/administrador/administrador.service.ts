import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Administrador } from './entities/administrador.entity';

@Injectable()
export class AdministradorService {

    constructor(
        @InjectRepository(Administrador)
        private readonly administradorRepo: Repository<Administrador>
    ){
    }

    async findOne(id: string) {
    const administrador = await this.administradorRepo.findOneBy({mail: id});
    console.log(administrador)
    if (!administrador) {
    return null;
  }
  
    return administrador;
  }
}