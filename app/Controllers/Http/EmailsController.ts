import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Config from 'App/Models/Config';
import Nota from 'App/Models/Nota';
import nodemailer from 'nodemailer';
import AWS from 'aws-sdk';
import Emissore from 'App/Models/Emissor';

function formatDateMY(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${month}${year}`;
}

export default class EmailsController {
  public async sendEmail({ request, response }: HttpContextContract) {
    const id_nfe = request.input('id_nfe');
    const assunto = request.input('assunto');
    const mensagem = request.input('mensagem');
    const id_emissor = request.input('id_emissor');
    const destinatario = request.input('destinatario');
    const envia_pdf = request.input('envia_pdf') === 'true';
    
    const { destinatario_cc } = request.body();
    const { destinatario_cco } = request.body();

    const copiaCC: string[] = [];
    const copiaCCO: string[] = [];

    const anexos: any[] = [];

    destinatario_cc.forEach((email: string) => {
      copiaCC.push(email['email']);
    });

    destinatario_cco.forEach((email: string) => {
      copiaCCO.push(email['email']);
    });
    
    try {
      const remetente = await Config.findByOrFail('id_emissor', id_emissor);

      const transporter = nodemailer.createTransport({
        host: remetente.host,
        port: parseInt(remetente.porta),
        secure: remetente.autenticacao,
        auth: {
          user: remetente.usuario,
          pass: remetente.senha,
        },
      });

      if (envia_pdf) {
        const dataAtual = formatDateMY(new Date());
        const nfe = await Nota.findByOrFail('id', id_nfe);
        const emissor = await Emissore.findByOrFail('id', id_emissor);
        
        const s3 = new AWS.S3({
          credentials: {
            accessKeyId: 'AKIA24Q2DD2KRSPSDP7Q',
            secretAccessKey: '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',
          }
        });
        
        const params = {
          Bucket: 'osplus-nfe',
          Key: `arquivos/${emissor.cnpjcpf}/${dataAtual}/${nfe.chave_acesso}.pdf`,
        };

        const data = await s3.getObject(params).promise();
        const pdf = data.Body;

        anexos.push({
          filename: `${nfe.chave_acesso}.pdf`,
          content: pdf,
        });
      }

      const mailOptions = {
        from: `${remetente.email_remetente} <${remetente.email}>`,
        to: destinatario,
        cc: copiaCC,
        bcc: copiaCCO,
        subject: assunto,
        html: mensagem,
        attachments: anexos,
      };

      const data = await transporter.sendMail(mailOptions);
      response.status(201);
      
      return data;
    } catch (error: any) {
      throw new Exception(error);
    }
  }
}