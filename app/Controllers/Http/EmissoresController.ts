import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import Emissor from 'App/Models/Emissor';

export default class EmissoresController {

  public async getEmissores() {

    try {
      return await Emissor.all();

    } catch (error) {
      throw new Exception(error.getMessage());
    }
  }

  public async getEmissorById({ params }: HttpContextContract) {

    try {
      return await Emissor.find(params.id);

    } catch (error) {
      throw new Exception(error.getMessage());
    }
  }

  public async setEmissor({ request, response }: HttpContextContract) {

    try {
      await Emissor.create(request.body());

      response.status(201);

    } catch (error) {
      throw new Exception(error.getMessage());
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
      throw new Exception(error.getMessage());
    }
  }

  public async deleteEmissor({ params }: HttpContextContract) {

    try {
      const data = await Emissor.find(params.id);

      if (data != null) {
        await data.delete();
      }

    } catch (error) {
      throw new Exception(error.getMessage());
    }
  }
}
