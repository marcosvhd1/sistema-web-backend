import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Config from 'App/Models/Config';

export default class EmailsController {
  public async sendEmail({ request }: HttpContextContract) {
    const id_emissor = request.input('id_emissor');
    const destinatario = request.input('destinatario');
    const destinatario_cc = request.input('destinatario_cc');
    const destinatario_cco = request.input('destinatario_cco');
    const assunto = request.input('assunto');
    const mensagem = request.input('mensagem');
    
    try {
      const remetente = await Config.findByOrFail('id_emissor', id_emissor);

      //   const transporter = nodemailer.createTransport({
      //     host: remetente.host,
      //     port: remetente.porta,
      //     secure: remetente.autenticacao,
      //     auth: {
      //       user: remetente.usuario,
      //       pass: remetente.senha,
      //     },
      //   });

      const mailOptions = {
        from: `${remetente.email_remetente} <${remetente.email}>`,
        to: destinatario,
        cc: destinatario_cc,
        bcc: destinatario_cco,
        subject: assunto,
        html: mensagem,
        attachments: [],
      };

      return mailOptions;

    //   await transporter.sendMail(mailOptions);
    } catch (error: any) {
      throw new Exception(error);
    }
  }
}