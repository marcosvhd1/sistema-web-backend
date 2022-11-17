import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';

import Servico from 'App/Models/Servico';

export default class ServicosController {

  public async getServicos({ request, response }: HttpContextContract) {

    const page = request.input('page', 1);
    const limit = request.input('limit');

    try {
      const data = await Database.from('servicos').orderBy('id').paginate(page, limit);

      response.header('qtd', data.total);

      return data.all();

    } catch (error) {
      throw new Exception(error.getMessage());
    }
  }

  public async getServicoById({ params }: HttpContextContract) {

    try {
      return await Servico.find(params.id);

    } catch (error) {
      throw new Exception(error.getMessage());
    }

  }

  public async setServico({ request, response }: HttpContextContract) {

    try {
      await Servico.create(request.body());

      response.status(201);

    } catch (error) {
      throw new Exception(error.getMessage());
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

    } catch (error) {
      throw new Exception(error.getMessage());
    }
  }

  public async deleteServico({ params }: HttpContextContract) {

    try {
      const data = await Servico.find(params.id);

      if (data != null) {
        await data.delete();
      }

    } catch (error) {
      throw new Exception(error.getMessage());
    }
  }

  public async maxNServ() {

    try {
      const maxNProd = await Database.rawQuery('select max(nserv) from servicos');

      return maxNProd;

    } catch (error) {
      throw new Exception(error.getMessage());
    }
  }

  public async searchFilter({ request, response }: HttpContextContract) {
    const { filter, description } = request.qs();

    const page = request.input('page', 1);
    const limit = request.input('limit');

    try {
      const data = await Database.from('servicos').select('*').where(filter, 'ilike', `%${description.toUpperCase()}%`).orderBy('id').paginate(page, limit);
      response.header('qtd', data.total);

      return data.all();

    } catch (error) {
      throw new Exception(error.getMessage());
    }
  }
}
