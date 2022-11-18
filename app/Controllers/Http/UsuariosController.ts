import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';

import Usuario from 'App/Models/Usuario';

export default class UsuariosController {

  public async getUsuarios({ request, response }: HttpContextContract) {

    const page = request.input('page', 1);
    const limit = request.input('limit');
    const id_emissor = request.input('id_emissor');

    try {
      const data = await Database.from('usuarios').where('id_emissor', '=', id_emissor).orderBy('id').paginate(page, limit);

      response.header('qtd', data.total);

      return data.all();

    } catch (error) {
      throw new Exception(error);
    }
  }

  public async getUsuarioById({ params }: HttpContextContract) {

    try {
      return await Usuario.find(params.id);

    } catch (error) {
      throw new Exception(error);
    }
  }

  public async setUsuario({ request, response }: HttpContextContract) {

    try {
      await Usuario.create(request.body());

      response.status(201);

    } catch (error) {
      throw new Exception(error);
    }
  }

  public async updateUsuario({ request, params }: HttpContextContract) {

    const body = request.body();

    try {
      const data = await Usuario.find(params.id);

      if (data != null) {
        data.id_empresa = body.id_empresa;
        data.email = body.email;
        data.password = body.password;
        data.tipo_admin = body.tipo_admin;
        data.rememberMeToken = body.rememberMeToken;

        await data.save();
      }

    } catch (error) {
      throw new Exception(error);
    }
  }

  public async deleteUsuario({ params, request }: HttpContextContract) {

    const id_emissor = request.input('id_emissor');

    try {
      await Database.from('usuarios').delete().where('id', '=', params.id).where('id_emissor', '=', id_emissor);

    } catch (error) {
      throw new Exception(error);
    }
  }
}
