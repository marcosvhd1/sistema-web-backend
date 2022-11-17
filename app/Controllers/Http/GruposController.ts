import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';

import Grupo from 'App/Models/Grupo';

export default class GruposController {

  public async getGrupos({ request, response }: HttpContextContract) {

    const page = request.input('page', 1);
    const limit = request.input('limit');

    try {
      const data = await Database.from('grupos').orderBy('id').paginate(page, limit);

      response.header('qtd', data.total);

      return data.all();

    } catch (error) {
      throw new Exception(error.getMessage());
    }
  }

  public async getGrupoById({ params }: HttpContextContract) {

    try {
      return await Grupo.find(params.id);

    } catch (error) {
      throw new Exception(error.getMessage());
    }
  }

  public async setGrupo({ request, response }: HttpContextContract) {

    try {
      await Grupo.create(request.body());

      response.status(201);

    } catch (error) {
      throw new Exception(error.getMessage());
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

    } catch (error) {
      throw new Exception(error.getMessage());
    }
  }

  public async deleteGrupo({ params }: HttpContextContract) {

    try {
      const data = await Grupo.find(params.id);

      if (data != null) {
        await data.delete();
      }

    } catch (error) {
      throw new Exception(error.getMessage());
    }
  }
}
