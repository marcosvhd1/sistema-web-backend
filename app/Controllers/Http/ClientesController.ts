import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';

import Cliente from 'App/Models/Cliente';

export default class ClientesController {

  public async getClientes({ request, response }: HttpContextContract) {

    const page = request.input('page', 1);
    const limit = request.input('limit');

    try {
      const data = await Database.from('clientes').orderBy('id').paginate(page, limit);

      response.header('qtd', data.total);

      return data.all();

    } catch (error) {
      throw new Exception(error.getMessage());
    }
  }

  public async getClienteById({ params }: HttpContextContract) {

    try {
      return await Cliente.find(params.id);

    } catch (error) {
      throw new Exception(error.getMessage());
    }
  }

  public async setCliente({ request, response }: HttpContextContract) {

    try {
      await Cliente.create(request.body());

      response.status(201);
<<<<<<< HEAD

    } catch (error: any) {
      throw new Exception(error.getMessage());
    }

=======

    } catch (error) {
      throw new Exception(error.getMessage());
    }
>>>>>>> adea056d653ce28bb2a051c1d32cdc917c0b6575
  }

  public async updateCliente({ request, params }: HttpContextContract) {
    const body = request.body();

    try {
      const data = await Cliente.find(params.id);

      if (data != null) {
        data.id_emissor = body.id_emissor;
        data.tipo = body.tipo;
        data.categoria = body.categoria;
        data.razao = body.razao;
        data.fantasia = body.fantasia;
        data.cnpjcpf = body.cnpjcpf;
        data.rg = body.rg;
        data.ie = body.ie;
        data.im = body.im;
        data.suframa = body.suframa;
        data.tipo_contribuinte = body.tipo_contribuinte;
        data.logradouro = body.logradouro;
        data.numero = body.numero;
        data.bairro = body.bairro;
        data.cep = body.cep;
        data.uf = body.uf;
        data.cidade = body.cidade;
        data.id_cidade = body.id_cidade;
        data.complemento = body.complemento;
        data.observacao = body.observacao;
        data.tipo_telefone1 = body.tipo_telefone1;
        data.tipo_telefone2 = body.tipo_telefone2;
        data.tipo_telefone3 = body.tipo_telefone3;
        data.telefone1 = body.telefone1;
        data.telefone2 = body.telefone2;
        data.telefone3 = body.telefone3;
        data.pais = body.pais;
        data.cod_pais = body.cod_pais;
        data.email1 = body.email1;
        data.email2 = body.email2;
        data.site = body.site;

        await data.save();
      }

    } catch (error) {
      throw new Exception(error.getMessage());
    }
  }

  public async deleteCliente({ params }: HttpContextContract) {

    try {
      const data = await Cliente.find(params.id);

      if (data != null) {
        await data.delete();
      }

    } catch (error) {
      throw new Exception(error.getMessage());
    }
  }

  public async maxCod() {

    try {
      const maxCod = await Database.rawQuery('select max(cod) from clientes');

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
      const cliente = await Database.from('clientes').select('*').where(filter, 'ilike', `%${description.toUpperCase()}%`).orderBy('id').paginate(page, limit);
      response.header('qtd', cliente.total);

      return cliente.all();

    } catch (error) {
      throw new Exception(error.getMessage());
    }
  }
}
