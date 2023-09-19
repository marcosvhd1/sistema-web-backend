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

  public async getByID({ params }: HttpContextContract) {

    try {
      const data = await Database.from('produtos').select('*').where('id', '=', params.id).orderBy('id');
      return data;
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async getAll({ request, response }: HttpContextContract) {
    const { filter, description, group, marca, orderBy, orderDirection } = request.qs();
    const page = request.input('page', 1);
    const limit = request.input('limit');
    const id_emissor = request.input('id_emissor');
    const status = request.input('status');

    const whereGroup = ` and grupo = '${group}'`;
    const whereMarca = ` and marca = '${marca}'`;
    const whereFilter = ` and ${filter}::TEXT ilike '%${description.toUpperCase()}%'`;
    const whereStatus = ` and status = '${status}'`;

    try {
      let whereSql = `id_emissor = ${id_emissor}`;

      if (group != '') whereSql += whereGroup;
      if (marca != '') whereSql += whereMarca;
      if (description != '') whereSql += whereFilter;
      if (status === 'Ativo') whereSql += whereStatus;

      const produtos = await Database.from('produtos')
        .select('*')
        .whereRaw(whereSql)
        .orderByRaw(`${orderBy} ${orderDirection}`)
        .paginate(page, limit);

      response.header('qtd', produtos.total);
      return produtos.all();
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
      await Database.from('produtos').delete().where('id', '=', params.id).andWhere('id_emissor', '=', id_emissor);
    } catch (error: any) {
      throw new Exception(error);
    }
  }
}
