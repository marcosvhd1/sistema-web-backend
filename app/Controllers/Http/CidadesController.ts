import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import Cidade from 'App/Models/Cidade';

export default class CidadesController {

  public async getCidades() {

    return await Cidade.all();
  }

  public async getCidadeById({ params }: HttpContextContract) {

    return await Cidade.find(params.id) ?? false;
  }

  public async getCidadesByUF({ params }: HttpContextContract) {

    return await Cidade.find(params.uf) ?? false;
  }

  public async setCidade({ request, response }: HttpContextContract) {

    await Cidade.create(request.body());

    response.status(201);

    return true;
  }

  public async updateCidade({ request, params }: HttpContextContract) {

    const body = request.body();

    const data = await Cidade.find(params.id);

    if (data != null) {
      data.nome = body.nome;
      data.uf = body.uf;

      await data.save();

      return true;
    }

    return false;
  }

  public async deleteCidade({ params }: HttpContextContract) {

    const data = await Cidade.find(params.id);

    if (data != null) {
      await data.delete();

      return true;
    }

    return false;
  }

}
