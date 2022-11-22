import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';

import Emissor from 'App/Models/Emissor';

export default class EmissoresController {

  public async getEmissoresByUser({ request }: HttpContextContract) {
    const idUsuario = request.input('id_usuario');
    const idEmissores: number[] = [];

    try {

      const data = await Database.from('emissor_usuarios').where('id_usuario', '=', idUsuario);

      data.forEach((e: { id_emissor: number; }) => idEmissores.push(e.id_emissor));

      return await Database.from('emissores').whereIn('id', idEmissores);

    } catch (error) {

      throw new Exception(error);

    }
  }

  public async setEmissor({ request, response }: HttpContextContract) {
    try {
      await Emissor.create(request.body());

      response.status(201);

    } catch (error) {
      throw new Exception(error);
    }
  }

  public async updateEmissor({ request, params }: HttpContextContract) {

    const body = request.body();

    try {
      const data = await Emissor.find(params.id);

      if (data != null) {
        data.id_empresa = body.id_empresa;
        data.razao = body.razao;
        data.cnpjcpf = body.cnpjcpf;

        await data.save();
      }

    } catch (error) {
      throw new Exception(error);
    }
  }

  public async deleteEmissor({ params }: HttpContextContract) {

    try {
      const data = await Emissor.find(params.id);

      if (data != null) {
        await data.delete();
      }

    } catch (error) {
      throw new Exception(error);
    }
  }
}
