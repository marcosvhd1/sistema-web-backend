import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { Exception } from '@adonisjs/core/build/standalone';

import Empresa from 'App/Models/Empresa';
import Database from '@ioc:Adonis/Lucid/Database';

export default class EmpresasController {


  public async getEmpresaId({ request }: HttpContextContract) {
    const { cnpjcpf } = request.qs();
    try {
      const data = await Database.from('empresas').select('id').where('cnpjcpf', '=', cnpjcpf);
      return data;
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async create({ request, response }: HttpContextContract) {
    try {
      await Empresa.create(request.body());
      response.status(201);
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async update({ request, params }: HttpContextContract) {
    const body = request.body();

    try {
      const data = await Empresa.find(params.id);

      if (data != null) {
        await data.fill(body).save();
      }
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async delete({ params }: HttpContextContract) {
    try {
      const data = await Empresa.find(params.id);

      if (data != null) {
        await data.delete();
      }

    } catch (error: any) {
      throw new Exception(error);
    }
  }
}
