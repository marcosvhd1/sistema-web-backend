import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';

import Grupo from 'App/Models/Grupo';

export default class GruposController {

  public async getAll({ request }: HttpContextContract) {
    const id_emissor = request.input('id_emissor');

    try {
      const data = await Database.from('grupos').select('*').where('id_emissor', '=', id_emissor).orderBy('descricao');

      return data;
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async create({ request, response }: HttpContextContract) {
    try {
      await Grupo.create(request.body());
      response.status(201);
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async update({ request, params }: HttpContextContract) {
    const body = request.body();

    try {
      const data = await Grupo.find(params.id);

      if (data != null) {
        await data.fill(body).save();
      }
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async delete({ params, request }: HttpContextContract) {
    const id_emissor = request.input('id_emissor');

    try {
      await Database.from('grupos').delete().where('id', '=', params.id).where('id_emissor', '=', id_emissor);
    } catch (error: any) {
      throw new Exception(error);
    }
  }
}
