import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { Exception } from '@adonisjs/core/build/standalone';
import Database from '@ioc:Adonis/Lucid/Database';

import Cliente from 'App/Models/Cliente';

export default class ClientesController {

  public async max({ request }: HttpContextContract) {
    const id_emissor = request.input('id_emissor');

    try {
      const max = await Database.from('clientes').max('cod').where('id_emissor', '=', id_emissor);
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
      const cliente = await Database.from('clientes').select('*').where(filter, 'ilike', `%${description.toUpperCase()}%`).where('id_emissor', '=', id_emissor).orderBy('id').paginate(page, limit);
      response.header('qtd', cliente.total);
      return cliente.all();
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async create({ request, response }: HttpContextContract) {
    try {
      await Cliente.create(request.body());
      response.status(201);
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async update({ request, params }: HttpContextContract) {
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
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async delete({ params, request }: HttpContextContract) {
    const id_emissor = request.input('id_emissor');

    try {
      await Database.from('clientes').delete().where('id', '=', params.id).where('id_emissor', '=', id_emissor);
    } catch (error) {
      throw new Exception(error);
    }
  }
}
