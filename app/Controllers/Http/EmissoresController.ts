import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';

import Emissor from 'App/Models/Emissor';
import Empresa from 'App/Models/Empresa';
import Usuario from 'App/Models/Usuario';

export default class EmissoresController {

  public async getAll({ request }: HttpContextContract) {
    const idUsuario = request.input('id_usuario');
    const idEmissores: number[] = [];

    try {
      const data = await Database.from('emissor_usuarios').where('id_usuario', '=', idUsuario);
      data.forEach((e: { id_emissor: number; }) => idEmissores.push(e.id_emissor));
      return await Database.from('emissores').whereIn('id', idEmissores);
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async create({ request, response }: HttpContextContract) {
    try {
      await Emissor.create(request.body());
      response.status(201);
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async update({ request, params }: HttpContextContract) {
    const body = request.body();

    try {
      const data = await Emissor.find(params.id);

      if (data != null) {
        data.razao = body.razao;
        data.cnpjcpf = body.cnpjcpf;
        await data.save();
      }
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async delete({ params }: HttpContextContract) {
    try {
      const data = await Emissor.find(params.id);

      if (data != null) {
        await data.delete();
      }
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async updateUltimoEmissorSelecionado({ request }: HttpContextContract) {
    const idUsuario = request.input('id_usuario');
    const idEmissor = request.input('id_emissor');

    try {
      const data = await Usuario.find(idUsuario);

      if (data != null) {
        data.ultimo_emissor_selecionado = idEmissor;
        await data.save();
      }
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async getUltimoEmissorSelecionadoByUser({ request }: HttpContextContract) {
    const cnpjcpf = request.input('cnpjcpf');
    const emailRequest = request.input('email');

    try {
      const { id } = await Empresa.findByOrFail('cnpjcpf', cnpjcpf);
      const users = await Database.from('usuarios').where('id_empresa', '=', id);
      const user = users.find((e) => emailRequest.includes(e.email));

      const result = {
        idUsuario: user.id,
        ultimoEmissorSelecionado: user.ultimo_emissor_selecionado
      };

      return result;
    } catch (error: any) {
      throw new Exception(error);
    }
  }
}
