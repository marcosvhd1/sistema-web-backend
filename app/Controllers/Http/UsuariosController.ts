import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { Exception } from '@adonisjs/core/build/standalone';
import Database from '@ioc:Adonis/Lucid/Database';

import Usuario from 'App/Models/Usuario';

export default class UsuariosController {

  public async getAll({ request, response }: HttpContextContract) {
    const { filter, description, orderBy, orderDirection } = request.qs();
    const cnpjcpf = request.input('emp');
    const page = request.input('page', 1);
    const limit = request.input('limit');

    try {
      const data = await Database.from('usuarios')
        .join('empresas', 'usuarios.id_empresa', '=', 'empresas.id')
        .select('usuarios.*')
        .whereRaw(`${filter}::TEXT ilike '%${description.toUpperCase()}%'`)
        .where('cnpjcpf', '=', cnpjcpf)
        .orderByRaw(`${orderBy} ${orderDirection}`)
        .paginate(page, limit);

      response.header('qtd', data.total);
      return data.all();
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async getUserId({ request }: HttpContextContract) {
    const email = request.input('user');
    const id = request.input('id');

    const data = await Database.from('usuarios').where('email', '=', email).andWhere('id_empresa', '=', id);
    return data;
  }

  public async getMasterUser({ request }: HttpContextContract) {
    const cnpjcpf = request.input('emp');
    const data = await Database.from('usuarios').join('empresas', 'usuarios.id_empresa', '=', 'empresas.id').select('usuarios.*').where('cnpjcpf', '=', cnpjcpf).andWhere('usuario_principal', '=', 'Sim');
    return data;
  }

  public async create({ request, response }: HttpContextContract) {

    try {
      await Usuario.create(request.body());
      response.status(201);
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async update({ request, params }: HttpContextContract) {
    const body = request.body();

    try {
      const user = await Usuario.find(params.id);

      if (user != null) {
        user.email = body.email;
        user.password = body.password;
        user.tipo_admin = body.tipo_admin;
        user.status = body.status;
        
        user.save();
      }
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async delete({ params }: HttpContextContract) {
    try {
      await Database.from('usuarios').delete().where('id', '=', params.id).andWhere('usuario_principal', '=', 'Não');
    } catch (error: any) {
      throw new Exception(error);
    }
  }
}
