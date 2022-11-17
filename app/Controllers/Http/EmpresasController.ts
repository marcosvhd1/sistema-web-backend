import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import Empresa from 'App/Models/Empresa';

export default class EmpresasController {

  public async getEmpresas() {

    try {
      return await Empresa.all();

    } catch (error) {
      throw new Exception(error.getMessage());
    }
  }

  public async getEmpresaById({ params }: HttpContextContract) {

    try {
      return await Empresa.find(params.id);

    } catch (error) {
      throw new Exception(error.getMessage());
    }
  }

  public async setEmpresa({ request, response }: HttpContextContract) {

    try {
      await Empresa.create(request.body());

      response.status(201);

    } catch (error) {
      throw new Exception(error.getMessage());
    }
  }

  public async updateEmpresa({ request, params }: HttpContextContract) {

    const body = request.body();

    try {
      const data = await Empresa.find(params.id);

      if (data != null) {
        data.cnpjcpf = body.cnpjcpf;

        await data.save();
      }

    } catch (error) {
      throw new Exception(error.getMessage());
    }
  }

  public async deleteEmpresa({ params }: HttpContextContract) {

    try {
      const data = await Empresa.find(params.id);

      if (data != null) {
        await data.delete();
      }

    } catch (error) {
      throw new Exception(error.getMessage());
    }
  }
}
