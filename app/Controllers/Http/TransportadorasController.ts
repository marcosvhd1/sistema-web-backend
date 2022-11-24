import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';

import Transportadora from 'App/Models/Transportadora';

export default class TransportadorasController {

  public async max({ request }: HttpContextContract) {
    const id_emissor = request.input('id_emissor');

    try {
      const max = await Database.from('servicos').select('max(nserv)').where('id_emissor', '=', id_emissor);
      return max;
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async getAll({ request, response }: HttpContextContract) {
    const { filter, description } = request.qs();
    const page = request.input('page', 1);
    const limit = request.input('limit');
    const id_emissor = request.input('id_emissor');

    try {
      const data = await Database.from('transportadoras').select('*').where(filter, 'ilike', `%${description.toUpperCase()}%`).where('id_emissor', '=', id_emissor).orderBy('id').paginate(page, limit);
      response.header('qtd', data.total);
      return data.all();
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async create({ request, response }: HttpContextContract) {
    try {
      await Transportadora.create(request.body());
      response.status(201);
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async update({ request, params }: HttpContextContract) {
    const body = request.body();

    try {
      const data = await Transportadora.find(params.id);

      if (data != null) {
        data.id_emissor = body.id_emissor;
        data.razao = body.razao;
        data.fantasia = body.fantasia;
        data.cnpjcpf = body.cnpjcpf;
        data.ie = body.ie;
        data.rntrc = body.rntrc;
        data.logradouro = body.logradouro;
        data.numero = body.numero;
        data.bairro = body.bairro;
        data.cep = body.cep;
        data.uf = body.uf;
        data.cidade = body.cidade;
        data.id_cidade = body.id_cidade;
        data.complemento = body.complemento;
        data.anotacoes = body.anotacoes;
        data.tipo_telefone1 = body.tipo_telefone1;
        data.tipo_telefone2 = body.tipo_telefone2;
        data.telefone1 = body.telefone1;
        data.telefone2 = body.telefone2;
        data.placa = body.placa;
        data.uf_placa = body.uf_placa;
        await data.save();
      }
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async delete({ params, request }: HttpContextContract) {
    const id_emissor = request.input('id_emissor');

    try {
      await Database.from('servicos').delete().where('id', '=', params.id).where('id_emissor', '=', id_emissor);
    } catch (error: any) {
      throw new Exception(error);
    }
  }
}
