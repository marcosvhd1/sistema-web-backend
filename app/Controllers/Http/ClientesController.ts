import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';

import Cliente from 'App/Models/Cliente';

export default class ClientesController {

  public async getClientes({ request, response }: HttpContextContract) {

    const page = request.input('page', 1);
    const limit = request.input('limit');

    const clientes = await Database.from('clientes').orderBy('id').paginate(page, limit);

    response.header('qtd', clientes.total);

    return clientes.all();
  }

  public async getClienteById({ params }: HttpContextContract) {

    return await Cliente.find(params.id) ?? false;
  }

  public async setCliente({ request, response }: HttpContextContract) {

    await Cliente.create(request.body());

    response.status(201);

    return true;
  }

  public async updateCliente({ request, params }: HttpContextContract) {
    const body = request.body();

    const cliente = await Cliente.find(params.id);

    if (cliente != null) {
      cliente.id_emissor = body.id_emissor;
      cliente.tipo = body.tipo;
      cliente.categoria = body.categoria;
      cliente.razao = body.razao;
      cliente.fantasia = body.fantasia;
      cliente.cnpjcpf = body.cnpjcpf;
      cliente.rg = body.rg;
      cliente.ie = body.ie;
      cliente.im = body.im;
      cliente.suframa = body.suframa;
      cliente.tipo_contribuinte = body.tipo_contribuinte;
      cliente.logradouro = body.logradouro;
      cliente.numero = body.numero;
      cliente.bairro = body.bairro;
      cliente.cep = body.cep;
      cliente.uf = body.uf;
      cliente.cidade = body.cidade;
      cliente.id_cidade = body.id_cidade;
      cliente.complemento = body.complemento;
      cliente.observacao = body.observacao;
      cliente.tipo_telefone1 = body.tipo_telefone1;
      cliente.tipo_telefone2 = body.tipo_telefone2;
      cliente.tipo_telefone3 = body.tipo_telefone3;
      cliente.telefone1 = body.telefone1;
      cliente.telefone2 = body.telefone2;
      cliente.telefone3 = body.telefone3;
      cliente.pais = body.pais;
      cliente.cod_pais = body.cod_pais;
      cliente.email1 = body.email1;
      cliente.email2 = body.email2;
      cliente.site = body.site;

      await cliente.save();

      return true;
    }

    return false;
  }

  public async deleteCliente({ params }: HttpContextContract) {

    const cliente = await Cliente.find(params.id);

    if (cliente != null) {
      await cliente.delete();

      return true;
    }

    return false;
  }
}
