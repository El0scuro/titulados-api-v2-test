import { Column, Entity, Index, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Asignaciones } from "../../asignaciones/entities/asignacione.entity";
import { Estados } from "../../estados/entities/estado.entity";
import { Notas } from "../../notas/entities/nota.entity";
import { Fichas_inscripcion } from "src/ficha_inscripcion/entities/ficha_inscripcion.entity";
import { Rubrica_guia } from "src/rubrica_guia/entities/rubrica_guia.entity";
import { Rubrica_informante } from "src/rubrica_informante/entities/rubrica_informante.entity";
import { Tesis } from "src/tesis/entities/tesis.entity";

@Index("codigo", ["codigo"], { unique: true })
@Index("rut", ["rut"], { unique: true })
@Entity("estudiante", { schema: "tituladosv2" })
export class Estudiante {

  

  @Column("varchar", { primary: true, name: "mail", length: 255 })
  mail: string;

  @Column("varchar", { name: "nombre", length: 100 })
  nombre: string;

  @Column("varchar", { name: "segundoNombre", nullable: true, length: 100 })
  segundoNombre: string | null;

  @Column("varchar", { name: "apellido", length: 100 })
  apellido: string;

  @Column("varchar", { name: "segundoApellido", nullable: true, length: 100 })
  segundoApellido: string | null;

  @Column("varchar", { name: "rut", unique: true, length: 20 })
  rut: string;

  @Column("varchar", {name: "codigo", length: 50, unique: true, nullable: true,})
  codigo?: string | null;

  @Column("int", { name: "agnoIngreso", nullable: true })
  agnoIngreso: number | null;

  @Column("int", { name: "agnoEgreso", nullable: true })
  agnoEgreso: number | null;

  @Column("varchar", { name: "nroResolucion", nullable: true, length: 100 })
  nroResolucion: string | null;

  @Column("varchar", { name: "hora", nullable: true, length: 100 })
  hora: string | null;

  @Column("varchar", { name: "fechaExamen", nullable: true, length: 100 })
  fechaExamen: string | null;

  @Column("varchar", {name: "sede",  length: 100})
  sede: string | null;

  @Column({type: 'varchar', length: 100, nullable: true})
  mailPersonal: string | null;

  @Column({type: 'varchar', length: 100, nullable: true})
  semestre: string | null;

  @Column({type: 'varchar', length: 100, nullable: true})
  celular: string | null;

  @OneToMany(() => Asignaciones, (asignaciones) => asignaciones.estudianteRef)
  asignaciones: Asignaciones[];

  @OneToOne(() => Estados, (estados) => estados.mailEstudiante2)
  estados: Estados;

  @OneToOne(() => Notas, (notas) => notas.estudianteRef)
  notas: Notas;
  
  @OneToOne(() => Fichas_inscripcion, (fichas) => fichas.estudianteRef)
  fichas_inscripcion: Fichas_inscripcion;

  @OneToOne(() => Rubrica_guia, (rubricaGuia) => rubricaGuia.estudianteRef)
  rubrica_guia: Fichas_inscripcion;

  @OneToOne(() => Rubrica_informante, (rubricaInformante) => rubricaInformante.estudianteRef)
  rubrica_informante: Fichas_inscripcion;

  @OneToOne(() => Tesis, (tesis) => tesis.estudianteRef)
  tesis: Fichas_inscripcion;
}
