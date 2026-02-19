import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Estudiante } from '../estudiante/entities/estudiante.entity';
import {Profesor } from '../profesor/entities/profesor.entity';
import {Secretario } from '../secretario/entities/secretario.entity';
import {Jefatura } from '../jefatura/entities/jefatura.entity';
import { Administrador } from 'src/administrador/entities/administrador.entity';

@Injectable()
export class AuthService {
    constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepo: Repository<Estudiante>,

    @InjectRepository(Profesor)
    private readonly profesorRepo: Repository<Profesor>,

    @InjectRepository(Secretario)
    private readonly secretarioRepo: Repository<Secretario>,

    @InjectRepository(Jefatura)
    private readonly jefaturaRepo: Repository<Jefatura>,

    @InjectRepository(Administrador)
    private readonly administradorRepo: Repository<Administrador>
  ) {}
  async encontrar(correo : string){
    const estudiante = await this.estudianteRepo.findOneBy({mail: correo});
    const profesor = await this.profesorRepo.findOneBy({mail: correo});
    const secretario = await this.secretarioRepo.findOneBy({mail: correo});
    const jefatura = await this.jefaturaRepo.findOneBy({mail: correo});
    const administrador = await this.administradorRepo.findOneBy({mail: correo})
    const caja: (Estudiante| Profesor| Secretario| Jefatura| Administrador| null)[] = [estudiante, profesor, secretario, jefatura, administrador];
    for(let i = 0; i < caja.length;i++){
        if(caja[i]){
            return(caja[i]);
        }
    }
    
  }
}
