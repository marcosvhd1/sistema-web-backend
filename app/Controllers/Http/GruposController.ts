import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';

import Grupo from 'App/Models/Grupo';

export default class GruposController {

  public async getGrupos({ request, response }: HttpContextContract) {

    const page = request.input('page', 1);
    const limit = request.input('limit');

    const data = await Database.from('grupos').orderBy('id').paginate(page, limit);

    response.header('qtd', data.total);

    return data.all();
  }

  public async getGrupoById({ params }: HttpContextContract) {

    return await Grupo.find(params.id) ?? false;
  }

  public async setGrupo({ request, response }: HttpContextContract) {

    await Grupo.create(request.body());

    response.status(201);

    return true;
  }

  public async updateGrupo({ request, params }: HttpContextContract) {
    const body = request.body();

    const data = await Grupo.find(params.id);

    if (data != null) {
      data.id_emissor = body.id_emissor;
      data.descricao = body.descricao;
      data.tipo = body.tipo;

      await data.save();

      return true;
    }

    return false;
  }

  public async deleteGrupo({ params }: HttpContextContract) {

    const data = await Grupo.find(params.id);

    if (data != null) {
      await data.delete();

      return true;
    }

    return false;
  }
}
