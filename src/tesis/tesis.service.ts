import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tesis } from './entities/tesis.entity'; 

@Injectable()
export class ArchivosService {
  constructor(
    @InjectRepository(Tesis)
    private archivoRepo: Repository<Tesis>,
  ) {}

  // UPDATE
  async actualizarUsuario(id: number, data: Partial<Tesis>) {
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
    const tesis = await this.archivoRepo.find();
    if(!tesis){
      return null;
    }
    return tesis;
  }
}
