import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';

import Servico from 'App/Models/Servico';

export default class ServicosController {

  public async getServicos({ request, response }: HttpContextContract) {

    const page = request.input('page', 1);
    const limit = request.input('limit');

    const data = await Database.from('servicos').orderBy('id').paginate(page, limit);

    response.header('qtd', data.total);

    return data.all();
  }

  public async getServicoById({ params }: HttpContextContract) {

    return await Servico.find(params.id) ?? false;
  }

  public async setServico({ request, response }: HttpContextContract) {

    await Servico.create(request.body());

    response.status(201);

    return true;
  }

  public async updateServico({ request, params }: HttpContextContract) {
    const body = request.body();

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

      return true;
    }

    return false;
  }

  public async deleteServico({ params }: HttpContextContract) {

    const data = await Servico.find(params.id);

    if (data != null) {
      await data.delete();

      return true;
    }

    return false;
  }

  public async maxNServ() {

    const maxNProd = await Database.rawQuery('select max(nserv) from servicos');

    return maxNProd;
  }

  public async searchFilter({ request, response }: HttpContextContract) {
    const { filter, description } = request.qs();

    const page = request.input('page', 1);
    const limit = request.input('limit');

    const data = await Database.from('servicos').select('*').where(filter, 'ilike', `%${description.toUpperCase()}%`).orderBy('id').paginate(page, limit);
    response.header('qtd', data.total);

    return data.all();
  }
}
