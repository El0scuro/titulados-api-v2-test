import { Injectable } from '@nestjs/common';
import { MailerSend, EmailParams, Sender, Recipient, Attachment } from 'mailersend';
import { CreateMailDto } from './dto/create.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MailService {
  private mailerSend: MailerSend;

  constructor() {
    this.mailerSend = new MailerSend({
      apiKey: process.env.MAILERSEND_API_KEY,
    });
  }

  async enviarCorreo(dto: CreateMailDto) {
    const sentFrom = new Sender("noreply@test-nrw7gymnx3kg2k8e.mlsender.net", "Administración Pública");
    const recipients = [new Recipient(dto.toMail, "Destinatario")];
    
    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(sentFrom)
      .setSubject(dto.subject)
      .setHtml(`<strong>${dto.text}</strong>`)
      .setText(dto.text);

    try {
      await this.mailerSend.email.send(emailParams);
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, error };
    }
  }

  async enviarCorreoConAdjunto(dto: CreateMailDto) {
    
    let tipo = 'application/octet-stream'; // genérico y válido
    const attachments: Attachment[] = []; 
    
    for(let i = 0; i< dto.rutas.length; i++){
      if(!dto.archivos[i]){

      }
      if(dto.rutas[i] === "archivos_guia"){
        tipo = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      }else if(dto.rutas[i] === "archivos_Informante"){
        tipo = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      }else if(dto.rutas[i] === "archivos_Tesis"){
        tipo = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      }
      try{
        const filePath = path.join(
                  process.cwd(),
                  'src',
                  'archivos',
                  `${dto.rutas[i]}/${dto.archivos[i]}`
                )
        if (fs.existsSync(filePath)) {
        
        const fileBuffer = fs.readFileSync(filePath);
        const base64File = fileBuffer.toString('base64');
        attachments.push(
          new Attachment(
            base64File,
            dto.archivos[i],
            'attachment',
            tipo
          )
        );
        console.log('El archivo existe', filePath);
        } else {
        console.log('No existe');
        }
        
      }catch(error){
        console.log(error)
      }
      
        
    }


    //Email
    const emailParams = new EmailParams()
      .setFrom(new Sender('no-reply@test-nrw7gymnx3kg2k8e.mlsender.net', 'Administración Pública'))
      .setTo([new Recipient(dto.toMail)])
      .setSubject(dto.subject)
      .setHtml(dto.text)
      .setAttachments(attachments);

    //Enviar
    const mailerSend = new MailerSend({
      apiKey: process.env.MAILERSEND_API_KEY!,
    });

    await mailerSend.email.send(emailParams);
  }
}

