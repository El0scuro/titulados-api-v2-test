import { Module } from '@nestjs/common';
import { ArchivosController } from './ficha_inscripcion.controller';
import { Fichas_inscripcion } from './entities/ficha_inscripcion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArchivosService } from './ficha_inscripcion.service';

@Module({
  imports: [TypeOrmModule.forFeature([Fichas_inscripcion])],
  providers: [ArchivosService],
  controllers: [ArchivosController],

})
export class FichasModule {}
