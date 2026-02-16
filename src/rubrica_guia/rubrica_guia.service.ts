import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rubrica_guia } from './entities/rubrica_guia.entity'; 

@Injectable()
export class ArchivosService {
  constructor(
    @InjectRepository(Rubrica_guia)
    private archivoRepo: Repository<Rubrica_guia>,
  ) {}

  // UPDATE
  async actualizarUsuario(id: number, data: Partial<Rubrica_guia>) {
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
    const guias = await this.archivoRepo.find();
    if(!guias){
      return null;
    }
    return guias;
  }
}
