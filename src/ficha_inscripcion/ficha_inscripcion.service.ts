import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fichas_inscripcion } from './entities/ficha_inscripcion.entity'; 
import { EstudianteService } from 'src/estudiante/estudiante.service';

@Injectable()
export class ArchivosService {
  constructor(
    @InjectRepository(Fichas_inscripcion)
    private archivoRepo: Repository<Fichas_inscripcion>
  ) {}

  // UPDATE
  async actualizarUsuario(id: number, data: Partial<Fichas_inscripcion>) {
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

  async findAll(){
    const fichas = await this.archivoRepo.find();
    if(!fichas){
      return null;
    }
    return fichas;
  }
  

  // SELECT
  async obtenerUsuarios() {
    return this.archivoRepo.find();
  }
  async borrarRegistro(nombreArchivo: string){
    return this.archivoRepo.delete(nombreArchivo)
  }
}
