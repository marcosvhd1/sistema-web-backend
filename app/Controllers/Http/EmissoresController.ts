import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';

import Emissor from 'App/Models/Emissor';
import Usuario from 'App/Models/Usuario';

export default class EmissoresController {

  public async getAll({ request }: HttpContextContract) {
    const idUsuario = request.input('id_usuario');
    const idEmissores: number[] = [];

    try {
      const data = await Database.from('emissor_usuarios').where('id_usuario', '=', idUsuario);
      data.forEach((e: { id_emissor: number; }) => idEmissores.push(e.id_emissor));
      return await Database.from('emissores').whereIn('id', idEmissores).orderBy('status');
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async getAllByEmp({ request, response }: HttpContextContract) {
    const { filter, description } = request.qs();
    const page = request.input('page', 1);
    const limit = request.input('limit');
    const status = request.input('status');
    const idEmpresa = request.input('empresa');

    try {
      if (status === 'Ativo') {
        const data = await Database.from('emissores').whereRaw(`${filter}::TEXT ilike '%${description.toUpperCase()}%'`).where('id_empresa', '=', idEmpresa).andWhere('status', '=', 'Ativo').orderBy('id').paginate(page, limit);
        response.header('qtd', data.total);
        return data.all();
      } else {
        const data = await Database.from('emissores').whereRaw(`${filter}::TEXT ilike '%${description.toUpperCase()}%'`).where('id_empresa', '=', idEmpresa).orderBy('id').paginate(page, limit);
        response.header('qtd', data.total);
        return data.all();
      }
    } catch (error) {
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
        data.fantasia = body.fantasia;
        data.cnpjcpf = body.cnpjcpf;
        data.ie = body.ie;
        data.im = body.im;
        data.endereco = body.endereco;
        data.numero = body.numero;
        data.bairro = body.bairro;
        data.complemento = body.complemento;
        data.cnae = body.cnae;
        data.telefone = body.telefone;
        data.uf = body.uf;
        data.cidade = body.cidade;
        data.cep = body.cep;
        data.regime = body.regime;
        data.status = body.status;
        await data.save();
      }
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async delete({ params, response }: HttpContextContract) {
    try {
      const data = await Emissor.find(params.id);

      if (data != null) {
        await data.delete();
      }
    } catch (error: any) {
      response.send({
        status: '500',
        code: error.code,
        message: error.message
      });
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
      throw new Error(error);
    }
  }

  public async getUltimoEmissorSelecionadoByUser({ request }: HttpContextContract) {
    const cnpjcpf = request.input('cnpjcpf');
    const emailRequest = request.input('email');

    try {
      const data = await Database.from('empresas').where('cnpjcpf', '=', cnpjcpf);
      const { id } = data[0];
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
