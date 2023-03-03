import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import Config from 'App/Models/Config';

export default class ConfigsController {
    public async save({ request, response }: HttpContextContract) {
        const body = request.body();

        try {
            const data = await Config.findBy('id_emissor', body.id_emissor);

            if (data != null) {

                data.id_emissor = body.id_emissor;
                data.n_serie = body.n_serie;
                data.validade = body.validade;
                data.ambiente = body.ambiente;
                data.tipo_imp = body.tipo_imp;
                data.forma_emi = body.forma_emi;
                data.finalidade = body.finalidade;
                data.id_nfce = body.id_nfce;
                data.token_nfce = body.token_nfce;
                data.serie_padrao = body.serie_padrao;
                data.aliq_aprov_icms = body.aliq_aprov_icms;
                data.email = body.email;
                data.email_remetente = body.email_remetente;
                data.host = body.host;
                data.usuario = body.usuario;
                data.senha = body.senha;
                data.porta = body.porta;
                data.copia = body.copia;
                data.assunto = body.assunto;
                data.mensagem = body.mensagem;
                data.autenticacao = body.autenticacao;
                data.ssl = body.ssl;
                data.tls = body.tls;

                await data.save();
            } else {
                await Config.create(request.body());
            }

            response.status(201);
        } catch (error: any) {
            throw new Exception(error);
        }
    }

    public async getByEmissor({ request }: HttpContextContract) {
        const id_emissor = request.input('id_emissor');

        try {
            const data = await Config.findBy('id_emissor', id_emissor);

            return data;
        } catch (error: any) {
            throw new Exception(error);
        }
    }
}
