import { Global, Module } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteController } from './estudiante.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { JwtModule } from '@nestjs/jwt';
import { NotasModule } from 'src/notas/notas.module';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Estudiante]), NotasModule, JwtModule.register({
    secret: process.env.JWT_SECRET_KEY,
    signOptions: { expiresIn: '300m' },
  }),],
  controllers: [EstudianteController],
  providers: [EstudianteService],
  exports: [EstudianteService, TypeOrmModule.forFeature([Estudiante])],
})
export class EstudianteModule {}
