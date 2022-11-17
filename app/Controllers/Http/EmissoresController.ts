import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import Emissor from 'App/Models/Emissor';

export default class EmissoresController {

  public async getEmissores() {

    return await Emissor.all();
  }

  public async getEmissorById({ params }: HttpContextContract) {

    return await Emissor.find(params.id) ?? false;
  }

  public async setEmissor({ request, response }: HttpContextContract) {

    await Emissor.create(request.body());

    response.status(201);

    return true;
  }

  public async updateEmissor({ request, params }: HttpContextContract) {

    const body = request.body();

    const emissor = await Emissor.find(params.id);

    if (emissor != null) {

      emissor.id_empresa = body.id_empresa;
      emissor.razao = body.razao;
      emissor.cnpjcpf = body.cnpjcpf;

      await emissor.save();

      return true;
    }

    return false;
  }

  public async deleteEmissor({ params }: HttpContextContract) {

    const emissor = await Emissor.find(params.id);

    if (emissor != null) {
      await emissor.delete();

      return true;
    }

    return false;
  }
}
