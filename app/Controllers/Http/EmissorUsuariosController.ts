import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import EmissorUsuario from 'App/Models/EmissorUsuario';

export default class EmissorUsuariosController {

  public async getEmissorUsuarios() {

    return await EmissorUsuario.all();
  }

  public async getEmissorUsuarioById({ params }: HttpContextContract) {

    return await EmissorUsuario.find(params.id) ?? false;
  }

  public async setEmissorUsuario({ request, response }: HttpContextContract) {

    await EmissorUsuario.create(request.body());

    response.status(201);

    return true;
  }

  public async updateEmissorUsuario({ request, params }: HttpContextContract) {

    const body = request.body();

    const emissorUsuario = await EmissorUsuario.find(params.id);

    if (emissorUsuario != null) {

      emissorUsuario.id_emissor = body.id_emissor;
      emissorUsuario.id_usuario = body.id_usuario;

      await emissorUsuario.save();

      return true;
    }

    return false;
  }

  public async deleteEmissorUsuario({ params }: HttpContextContract) {

    const emissorUsuario = await EmissorUsuario.find(params.id);

    if (emissorUsuario != null) {
      await emissorUsuario.delete();

      return true;
    }

    return false;
  }
}
