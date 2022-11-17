import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';

import Transportadora from 'App/Models/Transportadora';

export default class TransportadorasController {

  public async getTransportadoras({ request, response }: HttpContextContract) {

    const page = request.input('page', 1);
    const limit = request.input('limit');

    const data = await Database.from('transportadoras').orderBy('id').paginate(page, limit);

    response.header('qtd', data.total);

    return data.all();
  }

  public async getTransportadoraById({ params }: HttpContextContract) {

    return await Transportadora.find(params.id) ?? false;
  }

  public async setTransportadora({ request, response }: HttpContextContract) {

    await Transportadora.create(request.body());

    response.status(201);

    return true;
  }

  public async updateTransportadora({ request, params }: HttpContextContract) {
    const body = request.body();

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

      return true;
    }

    return false;
  }

  public async deleteTransportadora({ params }: HttpContextContract) {

    const data = await Transportadora.find(params.id);

    if (data != null) {
      await data.delete();

      return true;
    }

    return false;
  }

  public async maxNServ() {

    const maxCod = await Database.rawQuery('select max(cod) from transportadoras');

    return maxCod;
  }

  public async searchFilter({ request, response }: HttpContextContract) {
    const { filter, description } = request.qs();

    const page = request.input('page', 1);
    const limit = request.input('limit');

    const data = await Database.from('transportadoras').select('*').where(filter, 'ilike', `%${description.toUpperCase()}%`).orderBy('id').paginate(page, limit);
    response.header('qtd', data.total);

    return data.all();
  }
}
