import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import Usuario from 'App/Models/Usuario';

export default class UsuariosController {

  public async getUsuarios() {

    try {
      return await Usuario.all();

    } catch (error) {
      throw new Exception(error.getMessage());
    }
  }

  public async getUsuarioById({ params }: HttpContextContract) {

    try {
      return await Usuario.find(params.id);

    } catch (error) {
      throw new Exception(error.getMessage());
    }
  }

  public async setUsuario({ request, response }: HttpContextContract) {

    try {
      await Usuario.create(request.body());

      response.status(201);

    } catch (error) {
      throw new Exception(error.getMessage());
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
      throw new Exception(error.getMessage());
    }
  }

  public async deleteUsuario({ params }: HttpContextContract) {

    try {
      const data = await Usuario.find(params.id);

      if (data != null) {
        await data.delete();
      }

    } catch (error) {
      throw new Exception(error.getMessage());
    }
  }
}
