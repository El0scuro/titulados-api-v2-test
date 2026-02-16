import { Controller, Get, Param} from '@nestjs/common';
import { AdministradorService } from './administrador.service';

@Controller('administrador')
export class AdministradorController {
    constructor(private readonly administradorService: AdministradorService){}

    @Get(':id')
        findOne(@Param('id') id: string) {
        return this.administradorService.findOne(id);
        }
}