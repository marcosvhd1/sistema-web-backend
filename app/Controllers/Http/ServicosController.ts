import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';

import Servico from 'App/Models/Servico';

export default class ServicosController {

  public async getServicos({ request, response }: HttpContextContract) {

    const page = request.input('page', 1);
    const limit = request.input('limit');
    const id_emissor = request.input('id_emissor');

    try {
      const data = await Database.from('servicos').select('*').where('id_emissor', '=', id_emissor).orderBy('id').paginate(page, limit);

      response.header('qtd', data.total);

      return data.all();

    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async getServicoById({ params }: HttpContextContract) {

    try {
      return await Servico.find(params.id);

    } catch (error: any) {
      throw new Exception(error);
    }

  }

  public async setServico({ request, response }: HttpContextContract) {

    try {
      await Servico.create(request.body());

      response.status(201);

    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async updateServico({ request, params }: HttpContextContract) {
    const body = request.body();

    try {
      const data = await Servico.find(params.id);

      if (data != null) {
        data.id_emissor = body.id_emissor;
        data.nserv = body.nserv;
        data.descricao = body.descricao;
        data.un = body.un;
        data.preco = body.preco;
        data.anotacoes = body.anotacoes;
        data.base_iss = body.base_iss;
        data.aliquota_iss = body.aliquota_iss;
        data.status = body.status;
        data.item_lista = body.item_lista;
        data.ncm = body.ncm;

        await data.save();
      }

    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async deleteServico({ params, request }: HttpContextContract) {

    const id_emissor = request.input('id_emissor');

    try {
      await Database.from('servicos').delete().where('id', '=', params.id).where('id_emissor', '=', id_emissor);

    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async max({ request }: HttpContextContract) {

    const id_emissor = request.input('id_emissor');

    try {
      const max = await Database.from('servicos').select('max(nserv)').where('id_emissor', '=', id_emissor);

      return max;

    } catch (error: any) {
      throw new Exception(error);
    }

  }

  public async searchFilter({ request, response }: HttpContextContract) {
    const { filter, description } = request.qs();

    const page = request.input('page', 1);
    const limit = request.input('limit');
    const id_emissor = request.input('id_emissor');

    try {
      const data = await Database.from('servicos').select('*').where(filter, 'ilike', `%${description.toUpperCase()}%`).where('id_emissor', '=', id_emissor).orderBy('id').paginate(page, limit);
      response.header('qtd', data.total);

      return data.all();

    } catch (error: any) {
      throw new Exception(error);
    }
  }
}
