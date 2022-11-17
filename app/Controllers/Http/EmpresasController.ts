import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import Empresa from 'App/Models/Empresa';

export default class EmpresasController {

  public async getEmpresas() {

    return await Empresa.all();
  }

  public async getEmpresaById({ params }: HttpContextContract) {

    return await Empresa.find(params.id) ?? false;
  }

  public async setEmpresa({ request, response }: HttpContextContract) {

    await Empresa.create(request.body());

    response.status(201);

    return true;
  }

  public async updateEmpresa({ request, params }: HttpContextContract) {

    const body = request.body();

    const empresa = await Empresa.find(params.id);

    if (empresa != null) {
      empresa.cnpjcpf = body.cnpjcpf;

      await empresa.save();

      return true;
    }

    return false;
  }

  public async deleteEmpresa({ params }: HttpContextContract) {

    const empresa = await Empresa.find(params.id);

    if (empresa != null) {
      await empresa.delete();

      return true;
    }

    return false;
  }

}
