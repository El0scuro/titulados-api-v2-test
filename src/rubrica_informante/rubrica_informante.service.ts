import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rubrica_informante } from './entities/rubrica_informante.entity'; 

@Injectable()
export class ArchivosService {
  constructor(
    @InjectRepository(Rubrica_informante)
    private archivoRepo: Repository<Rubrica_informante>,
  ) {}

  // UPDATE
  async actualizarUsuario(id: number, data: Partial<Rubrica_informante>) {
    return this.archivoRepo.update(id, data);
  }

  // CREATE
  async crearRegistro(
    mailEst: string,
    nombreArc: string,
    ruta: string,) {
    const fechaRegi = new Date();
    const nuevo = this.archivoRepo.create({
      mailEstudiante: mailEst,
      nombreArchivo: nombreArc,
      rutaArchivo: ruta,
      fechaSubida: fechaRegi
    })
    return this.archivoRepo.save(nuevo);
  }

  // SELECT
  async obtenerUsuarios() {
    return this.archivoRepo.find();
  }
  async borrarRegistro(nombreArchivo: string){
    return this.archivoRepo.delete(nombreArchivo)
  }

  async findAll(){
    const informantes = await this.archivoRepo.find();
    if(!informantes){
      return null;
    }
    return informantes;
  }
}
