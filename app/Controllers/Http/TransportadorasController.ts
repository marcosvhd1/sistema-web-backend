import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';

import Transportadora from 'App/Models/Transportadora';

export default class TransportadorasController {

  public async getTransportadoras({ request, response }: HttpContextContract) {

    const page = request.input('page', 1);
    const limit = request.input('limit');

    try {
      const data = await Database.from('transportadoras').orderBy('id').paginate(page, limit);

      response.header('qtd', data.total);

      return data.all();

    } catch (error) {
      throw new Exception(error.getMessage());
    }
  }

  public async getTransportadoraById({ params }: HttpContextContract) {

    try {
      return await Transportadora.find(params.id);

    } catch (error) {
      throw new Exception(error.getMessage());
    }
  }

  public async setTransportadora({ request, response }: HttpContextContract) {

    try {
      await Transportadora.create(request.body());

      response.status(201);

    } catch (error) {
      throw new Exception(error.getMessage());
    }
  }

  public async updateTransportadora({ request, params }: HttpContextContract) {
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

    } catch (error) {
      throw new Exception(error.getMessage());
    }
  }

  public async deleteTransportadora({ params }: HttpContextContract) {

    try {
      const data = await Transportadora.find(params.id);

      if (data != null) {
        await data.delete();
      }

    } catch (error) {
      throw new Exception(error.getMessage());
    }
  }

  public async maxNServ() {

    try {
      const maxCod = await Database.rawQuery('select max(cod) from transportadoras');

      return maxCod;

    } catch (error) {
      throw new Exception(error.getMessage());
    }
  }

  public async searchFilter({ request, response }: HttpContextContract) {
    const { filter, description } = request.qs();

    const page = request.input('page', 1);
    const limit = request.input('limit');

    try {
      const data = await Database.from('transportadoras').select('*').where(filter, 'ilike', `%${description.toUpperCase()}%`).orderBy('id').paginate(page, limit);
      response.header('qtd', data.total);

      return data.all();

    } catch (error) {
      throw new Exception(error.getMessage());
    }
  }
}
