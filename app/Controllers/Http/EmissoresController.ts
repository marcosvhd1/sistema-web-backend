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

    const data = await Emissor.find(params.id);

    if (data != null) {

      data.id_empresa = body.id_empresa;
      data.razao = body.razao;
      data.cnpjcpf = body.cnpjcpf;

      await data.save();

      return true;
    }

    return false;
  }

  public async deleteEmissor({ params }: HttpContextContract) {

    const data = await Emissor.find(params.id);

    if (data != null) {
      await data.delete();

      return true;
    }

    return false;
  }
}
