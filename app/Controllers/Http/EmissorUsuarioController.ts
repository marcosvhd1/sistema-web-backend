import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';
import EmissorUsuario from 'App/Models/EmissorUsuario';

export default class EmissorUsuarioController {

  public async getAllIdByUser({ request }: HttpContextContract) {
    const idUsuario = request.input('id_usuario');
    const idEmissores: number[] = [];

    try {
      const data = await Database.from('emissor_usuarios').where('id_usuario', '=', idUsuario);
      data.forEach((e: { id_emissor: number; }) => idEmissores.push(e.id_emissor));
      return idEmissores;
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async create({ request, response }: HttpContextContract) {
    try {
      await EmissorUsuario.create(request.body());
      response.status(201);
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async delete({ params }: HttpContextContract) {
    try {
      await Database.from('emissor_usuarios').delete().where('id_usuario', '=', params.id);
    } catch (error) {
      throw new Exception(error);
    }
  }

}
