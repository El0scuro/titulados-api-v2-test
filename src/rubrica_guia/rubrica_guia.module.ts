import { Module } from '@nestjs/common';
import { ArchivosController } from './rubrica_guia.controller';
import { Rubrica_guia } from './entities/rubrica_guia.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArchivosService } from './rubrica_guia.service';

@Module({
  imports: [TypeOrmModule.forFeature([Rubrica_guia])],
  providers: [ArchivosService],
  controllers: [ArchivosController],

})
export class GuiasModule {}
