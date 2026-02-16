import { Module } from '@nestjs/common';
import { ArchivosController } from './tesis.controller';
import { Tesis } from './entities/tesis.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArchivosService } from './tesis.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tesis])],
  providers: [ArchivosService],
  controllers: [ArchivosController],

})
export class TesisModule {}
