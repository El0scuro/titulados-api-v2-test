import { Controller, Post, Body} from '@nestjs/common';
import { MailService } from './mail.service';
import { CreateMailDto } from './dto/create.dto';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}
  
  @Post('enviar')
  async enviar(@Body() dto: CreateMailDto) {
    await this.mailService.enviarCorreo(
      dto
    );
    
    return { ok: true };
  }

  @Post('enviar_adjunto')
  async enviarConAdjunto(@Body() dto: CreateMailDto) {
    await this.mailService.enviarCorreoConAdjunto(
      dto
    );
    
    return { ok: true };
  }
}
