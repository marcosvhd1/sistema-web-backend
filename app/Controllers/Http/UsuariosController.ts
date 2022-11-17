import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import Usuario from 'App/Models/Usuario';

export default class UsuariosController {

  public async getUsuarios() {

    return await Usuario.all();
  }

  public async getUsuarioById({ params }: HttpContextContract) {

    return await Usuario.find(params.id) ?? false;
  }

  public async setUsuario({ request, response }: HttpContextContract) {

    await Usuario.create(request.body());

    response.status(201);

    return true;
  }

  public async updateUsuario({ request, params }: HttpContextContract) {

    const body = request.body();

    const usuario = await Usuario.find(params.id);

    if (usuario != null) {
      usuario.id_empresa = body.id_empresa;
      usuario.email = body.email;
      usuario.password = body.password;
      usuario.tipo_admin = body.tipo_admin;
      usuario.rememberMeToken = body.rememberMeToken;

      await usuario.save();

      return true;
    }

    return false;
  }

  public async deleteUsuario({ params }: HttpContextContract) {

    const usuario = await Usuario.find(params.id);

    if (usuario != null) {
      await usuario.delete();

      return true;
    }

    return false;
  }

}
