import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import EmissorUsuario from 'App/Models/EmissorUsuario';

export default class EmissorUsuarioController {

  public async create({ request, response }: HttpContextContract) {
    try {
      await EmissorUsuario.create(request.body());
      response.status(201);
    } catch (error: any) {
      throw new Exception(error);
    }
  }

}
