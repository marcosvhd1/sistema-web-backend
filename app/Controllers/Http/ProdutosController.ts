import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';

import Produto from 'App/Models/Produto';

export default class ProdutosController {

  public async max({ request }: HttpContextContract) {
    const id_emissor = request.input('id_emissor');

    try {
      const max = await Database.from('produtos').max('nprod').where('id_emissor', '=', id_emissor);
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
    const status = request.input('status');

    try {
      if (status === 'Ativo') {
        const data = await Database.from('produtos').select('*').whereRaw(`${filter}::TEXT ilike '%${description.toUpperCase()}%'`).andWhere('id_emissor', '=', id_emissor).andWhere('status', '=', 'Ativo').orderBy('id').paginate(page, limit);
        response.header('qtd', data.total);
        return data.all();

      } else {
        const data = await Database.from('produtos').select('*').whereRaw(`${filter}::TEXT ilike '%${description.toUpperCase()}%'`).andWhere('id_emissor', '=', id_emissor).orderBy('id').paginate(page, limit);
        response.header('qtd', data.total);
        return data.all();
      }
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async getAllByGroup({ request }: HttpContextContract) {
    const { filter, description, group } = request.qs();
    const page = request.input('page', 1);
    const limit = request.input('limit');
    const id_emissor = request.input('id_emissor');
    const status = request.input('status');

    try {
      const data = await Database.from('produtos').select('*').whereRaw(`${filter}::TEXT ilike '%${description.toUpperCase()}%'`).andWhere('grupo', '=', group).andWhere('id_emissor', '=', id_emissor).andWhere('status', '=', status).orderBy('id').paginate(page, limit);
      return data.all();
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async create({ request, response }: HttpContextContract) {
    try {
      await Produto.create(request.body());
      response.status(201);
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async update({ request, params }: HttpContextContract) {
    const body = request.body();

    try {
      const data = await Produto.find(params.id);

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
      await Database.from('produtos').delete().where('id', '=', params.id).where('id_emissor', '=', id_emissor);
    } catch (error: any) {
      throw new Exception(error);
    }
  }
}
