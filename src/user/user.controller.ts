import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { retry } from 'rxjs';
import { User } from 'src/decorators/getUser.decorator';
import { Estudiante } from 'src/estudiante/entities/estudiante.entity';
import { EstudianteService } from 'src/estudiante/estudiante.service';
import { Jefatura } from 'src/jefatura/entities/jefatura.entity';
import { JefaturaService } from 'src/jefatura/jefatura.service';
import { Profesor } from 'src/profesor/entities/profesor.entity';
import { ProfesorService } from 'src/profesor/profesor.service';
import { Secretario } from 'src/secretario/entities/secretario.entity';
import { SecretarioService } from 'src/secretario/secretario.service';
@Controller('user')
export class UserController {
    constructor(
        private readonly estudianteService: EstudianteService,
        private readonly profesorService: ProfesorService,
        private readonly secretarioService: SecretarioService,
        private readonly jefaturaService: JefaturaService
    ) { }

    @UseGuards(AuthGuard('jwt'))
    @Get('validate')
    async validateUser(@User() user, @Res() res) {
        let estudiante : Estudiante;
        let profesor : Profesor;
        let secretaria : Secretario;
        let jefatura : Jefatura;
        if(user.rol === "estudiante"){
            estudiante = await this.estudianteService.findOne(user.email);
        }else if(user.rol === "academico"){
            profesor = await this.profesorService.findOne(user.email);
        }else if(user.rol === "secretaria"){
            secretaria = await this.secretarioService.findOne(user.email);
        }else if(user.rol === "jefatura"){
            jefatura = await this.jefaturaService.findOne(user.email);
        }
        console.log(estudiante, profesor, secretaria, jefatura);
        if (!estudiante && !profesor && !secretaria && !jefatura) {
            return res.status(404).json({ message: 'Inexistente', user: user.rol });
        }
        if (estudiante) {
            return res.status(200).json({ message: 'Student authenticated', user: 'alumno' });
        }
        if (profesor) {
            return res.status(200).json({ message: 'Professor authenticated', user: 'profesor' });
        }
        if (secretaria) {
            return res.status(200).json({ message: 'Secretary authenticated', user: 'secretario' });
        }
        if (jefatura) {
            return res.status(200).json({ message: 'Jefatura authenticated', user: 'jefatura' });
        }
    }
    @Get('test')
    async test() {
        return { message: 'Test successful' };
    } 
}
