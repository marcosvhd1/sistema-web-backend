import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { Exception } from '@adonisjs/core/build/standalone';
import Database from '@ioc:Adonis/Lucid/Database';

import Cliente from 'App/Models/Cliente';

export default class ClientesController {

  public async max({ request }: HttpContextContract) {
    const id_emissor = request.input('id_emissor');

    try {
      const max = await Database.from('clientes').max('cod').where('id_emissor', '=', id_emissor);
      return max;
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async getAll({ request, response }: HttpContextContract) {
    const { filter, description, orderBy, orderDirection } = request.qs();
    const page = request.input('page', 1);
    const limit = request.input('limit');
    const id_emissor = request.input('id_emissor');

    try {
      const cliente = await Database.from('clientes')
        .select('*')
        .whereRaw(`${filter}::TEXT ilike '%${description.toUpperCase()}%'`)
        .where('id_emissor', '=', id_emissor)
        .orderByRaw(`${orderBy} ${orderDirection}`)
        .paginate(page, limit);

      response.header('qtd', cliente.total);
      return cliente.all();
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async create({ request, response }: HttpContextContract) {
    try {
      await Cliente.create(request.body());
      response.status(201);
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async update({ request, params }: HttpContextContract) {
    const body = request.body();

    try {
      const data = await Cliente.find(params.id);
      
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
      await Database.from('clientes').delete().where('id', '=', params.id).where('id_emissor', '=', id_emissor);
    } catch (error) {
      throw new Exception(error);
    }
  }
}
