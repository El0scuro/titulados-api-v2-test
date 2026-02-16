import { Global, Module } from '@nestjs/common';
import { AdministradorService } from './administrador.service';
import { AdministradorController } from './administrador.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Administrador } from './entities/administrador.entity';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Administrador]), JwtModule.register({
    secret: process.env.JWT_SECRET_KEY,
    signOptions: { expiresIn: '300m' },
  }),],
  controllers: [AdministradorController],
  providers: [AdministradorService],
  exports: [AdministradorService, TypeOrmModule.forFeature([Administrador])],
})
export class AdministradorModule {}