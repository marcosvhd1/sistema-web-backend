import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import EmissorUsuario from 'App/Models/EmissorUsuario';

export default class EmissorUsuariosController {

  public async getEmissorUsuarios() {

    try {
      return await EmissorUsuario.all();

    } catch (error) {
      throw new Exception(error);
    }
  }

  public async getEmissorUsuarioById({ params }: HttpContextContract) {

    try {
      return await EmissorUsuario.find(params.id);

    } catch (error) {
      throw new Exception(error);
    }
  }

  public async setEmissorUsuario({ request, response }: HttpContextContract) {

    try {
      await EmissorUsuario.create(request.body());

      response.status(201);

    } catch (error) {
      throw new Exception(error);
    }
  }

  public async updateEmissorUsuario({ request, params }: HttpContextContract) {

    const body = request.body();

    try {
      const data = await EmissorUsuario.find(params.id);

      if (data != null) {

        data.id_emissor = body.id_emissor;
        data.id_usuario = body.id_usuario;

        await data.save();
      }

    } catch (error) {
      throw new Exception(error);
    }
  }

  public async deleteEmissorUsuario({ params }: HttpContextContract) {

    try {
      const data = await EmissorUsuario.find(params.id);

      if (data != null) {
        await data.delete();
      }

    } catch (error) {
      throw new Exception(error);
    }
  }
}
