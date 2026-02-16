import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EstudianteModule } from './estudiante/estudiante.module';
import { ProfesorModule } from './profesor/profesor.module';
import { AsignacionesModule } from './asignaciones/asignaciones.module';
import { EstadosModule } from './estados/estados.module';
import { NotasModule } from './notas/notas.module';
import { JefaturaModule } from './jefatura/jefatura.module';
import { SecretarioModule } from './secretario/secretario.module';
import { Estudiante } from './estudiante/entities/estudiante.entity';
import { Asignaciones } from './asignaciones/entities/asignacione.entity';
import { Notas } from './notas/entities/nota.entity';
import { Profesor } from './profesor/entities/profesor.entity';
import { Estados } from './estados/entities/estado.entity';
import { Jefatura } from './jefatura/entities/jefatura.entity';
import { Secretario } from './secretario/entities/secretario.entity';
import { UserController } from './user/user.controller';
import { Module } from '@nestjs/common';
import { FichasModule } from './ficha_inscripcion/ficha_inscripcion.module';
import { TesisModule } from './tesis/tesis.module';
import {Fichas_inscripcion } from './ficha_inscripcion/entities/ficha_inscripcion.entity';
import { Rubrica_guia } from './rubrica_guia/entities/rubrica_guia.entity';
import { Rubrica_informante } from './rubrica_informante/entities/rubrica_informante.entity';
import { Tesis } from './tesis/entities/tesis.entity';
import { GuiasModule } from './rubrica_guia/rubrica_guia.module';
import { InformantesModule } from './rubrica_informante/rubrica_informante.module';
import { WordService } from './word/word.service';
import { WordController } from './word/word.controller';
import { MailModule } from './mail/mail.module';
import { MailService } from './mail/mail.service';
import { MailController } from './mail/mail.controller';
import { ExcelController } from './excel/excel.controller';
import { ExcelService } from './excel/excel.service';
import { ExcelModule } from './excel/excel.module';
import { AdministradorModule } from './administrador/administrador.module';
import { Administrador } from './administrador/entities/administrador.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST') || 'localhost',
        port: parseInt(configService.get<string>('DB_PORT')) || 3306,
        username: configService.get<string>('DB_USERNAME') || 'root',
        password: configService.get<string>('DB_PASSWORD') || 'transporteSW0608',
        database: configService.get<string>('DB_NAME') || '',
        entities: [Estudiante, Asignaciones, Notas, Profesor, Estados, Secretario, Jefatura, Fichas_inscripcion, Rubrica_guia, Rubrica_informante, Tesis, Administrador],
        synchronize: configService.get<string>('TYPEORM_SYNC') === 'true',
        driver: require('mysql2'),

      }),
      inject: [ConfigService],
    }),
    EstudianteModule,
    ProfesorModule,
    AsignacionesModule,
    EstadosModule,
    NotasModule,
    JefaturaModule,
    SecretarioModule,
    AuthModule,
    FichasModule,
    TesisModule,
    GuiasModule,
    InformantesModule,
    MailModule,
    ExcelModule,
    AdministradorModule
  ],
  controllers: [UserController, WordController, MailController, ExcelController],
  providers:[WordService, MailService, ExcelService],
})
export class AppModule { }
