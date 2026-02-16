import { Module } from '@nestjs/common';
import { ArchivosController } from './rubrica_informante.controller';
import { Rubrica_informante } from './entities/rubrica_informante.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArchivosService } from './rubrica_informante.service';

@Module({
  imports: [TypeOrmModule.forFeature([Rubrica_informante])],
  providers: [ArchivosService],
  controllers: [ArchivosController],

})
export class InformantesModule {}
