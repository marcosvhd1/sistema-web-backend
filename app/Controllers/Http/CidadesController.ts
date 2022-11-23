import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import Cidade from 'App/Models/Cidade';

export default class CidadesController {

  public async getCidades() {

    try {
      return await Cidade.all();

    } catch (error: any) {
      throw new Exception(error);
    }

  }

  public async getCidadeById({ params }: HttpContextContract) {

    try {
      return await Cidade.find(params.id);

    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async getCidadesByUF({ params }: HttpContextContract) {

    try {
      return await Cidade.find(params.uf);

    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async setCidade({ request, response }: HttpContextContract) {

    try {
      await Cidade.create(request.body());

      response.status(201);

    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async updateCidade({ request, params }: HttpContextContract) {

    const body = request.body();

    try {
      const data = await Cidade.find(params.id);

      if (data != null) {
        data.nome = body.nome;
        data.uf = body.uf;

        await data.save();
      }

    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async deleteCidade({ params }: HttpContextContract) {

    try {
      const data = await Cidade.find(params.id);

      if (data != null) {
        await data.delete();
      }

    } catch (error: any) {
      throw new Exception(error);
    }
  }
}
