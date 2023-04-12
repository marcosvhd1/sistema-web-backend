import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';

import Transportadora from 'App/Models/Transportadora';

export default class TransportadorasController {

  public async max({ request }: HttpContextContract) {
    const id_emissor = request.input('id_emissor');

    try {
      const max = await Database.from('transportadoras').max('cod').where('id_emissor', '=', id_emissor);
      return max;
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async getAll({ request, response }: HttpContextContract) {
    const { filter, description } = request.qs();
    const page = request.input('page', 1);
    const limit = request.input('limit');
    const id_emissor = request.input('id_emissor');

    try {
      const data = await Database.from('transportadoras').select('*').whereRaw(`${filter}::TEXT ilike '%${description.toUpperCase()}%'`).where('id_emissor', '=', id_emissor).orderBy('id').paginate(page, limit);
      response.header('qtd', data.total);
      return data.all();
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async create({ request, response }: HttpContextContract) {
    try {
      await Transportadora.create(request.body());
      response.status(201);
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async update({ request, params }: HttpContextContract) {
    const body = request.body();

    try {
      const data = await Transportadora.find(params.id);

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
      await Database.from('transportadoras').delete().where('id', '=', params.id).where('id_emissor', '=', id_emissor);
    } catch (error: any) {
      throw new Exception(error);
    }
  }
}
