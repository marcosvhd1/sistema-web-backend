import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';

import Grupo from 'App/Models/Grupo';

export default class GruposController {

  public async getGrupos({ request, response }: HttpContextContract) {

    const page = request.input('page', 1);
    const limit = request.input('limit');
    const id_emissor = request.input('id_emissor');

    try {
      const data = await Database.from('grupos').select('*').where('id_emissor', '=', id_emissor).orderBy('id').paginate(page, limit);

      response.header('qtd', data.total);

      return data.all();

    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async getGrupoById({ params }: HttpContextContract) {

    try {
      return await Grupo.find(params.id);

    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async setGrupo({ request, response }: HttpContextContract) {

    try {
      await Grupo.create(request.body());

      response.status(201);

    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async updateGrupo({ request, params }: HttpContextContract) {
    const body = request.body();

    try {
      const data = await Grupo.find(params.id);

      if (data != null) {
        data.id_emissor = body.id_emissor;
        data.descricao = body.descricao;
        data.tipo = body.tipo;

        await data.save();
      }

    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async deleteGrupo({ params, request }: HttpContextContract) {

    const id_emissor = request.input('id_emissor');

    try {
      await Database.from('grupos').delete().where('id', '=', params.id).where('id_emissor', '=', id_emissor);

    } catch (error: any) {
      throw new Exception(error);
    }
  }
}
