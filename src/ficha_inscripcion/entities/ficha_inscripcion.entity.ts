import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CreateDateColumn } from 'typeorm';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';

@Index("mailEstudiante", ["mailEstudiante"], { unique: true })
@Entity('fichas_inscripcion', {schema: "tituladosv2"} )
export class Fichas_inscripcion {
  @PrimaryGeneratedColumn()

  mailEstudiante: string;

  @Column()
  nombreArchivo: string;

  @Column({type: 'varchar', length: 255})
  rutaArchivo: string;

  @CreateDateColumn()
  fechaSubida: Date;

  

  @OneToOne(() => Estudiante, (estudiante) => estudiante.notas,  {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "mailEstudiante", referencedColumnName: "mail"}])
    estudianteRef: Estudiante;
}