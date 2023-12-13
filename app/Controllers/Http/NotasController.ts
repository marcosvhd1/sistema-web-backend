import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';
import NfDuplicata from 'App/Models/NfDuplicata';
import NfPagto from 'App/Models/NfPagto';
import NfProduto from 'App/Models/NfProduto';
import NfReferenciada from 'App/Models/NfReferenciada';

import Nota from 'App/Models/Nota';

function lpad(inputString: string) {
  while (inputString.length < 4) {
    inputString = '0' + inputString;
  }

  return inputString;
}

export default class NotasController {

  public async max({ request }: HttpContextContract) {
    const id_emissor = request.input('id_emissor');
    const serie = request.input('serie');

    try {
      const max = await Database.from('notas').max('cod').where('serie', '=', serie).where('id_emissor', '=', id_emissor);
      return max;
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async getAll({ request, response }: HttpContextContract) {
    const { filter, description, orderBy, orderDirection } = request.qs();
    const limit = request.input('limit');
    const page = request.input('page', 1);
    const dataFinal = request.input('data_final');
    const id_emissor = request.input('id_emissor');
    const filterDate = request.input('filter_date');
    const dataInicial = request.input('data_inicial');
    const filterStatus = request.input('filter_status');

    const whereStatus = ` and status = '${filterStatus}'`;
    const whereFilter = ` and ${filter}::TEXT ilike '%${description.toUpperCase()}%'`;
    const whereDate = ` and ${filterDate} between '${dataInicial}' and '${dataFinal}'`;

    try {
      let whereSql = `id_emissor = ${id_emissor}`;

      if (description != '') whereSql += whereFilter;
      if (filterDate != '') whereSql += whereDate;
      if (filterStatus != '') whereSql += whereStatus;

      const notas = await Database.from('notas').select('*')
        .whereRaw(whereSql)
        .orderByRaw(`${orderBy} ${orderDirection}`)
        .paginate(page, limit);
      response.header('qtd', notas.total);

      return notas.all();
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async getQtdDigit({ request }: HttpContextContract) {
    const id_emissor = request.input('id_emissor');

    try {
      const notas = await Database.from('notas').count('*')
        .where('status', '=', 'Em digitação')
        .where('id_emissor', '=', id_emissor);

      return notas;
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async create({ request }: HttpContextContract) {
    let body = request.body();

    try {
      body = {
        ...body,
        'id_destinatario': body.destinatario.id,
        'nome_destinatario': body.destinatario.razao,
        'id_transportadora': body.transportadora.id,
      };

      delete body.destinatario;
      delete body.produtos;
      delete body.transportadora;

      const result = await Nota.create(body);

      return result;
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async update({ request, params }: HttpContextContract) {
    let body = request.body();

    try {
      body = {
        ...body,
        'id_destinatario': body.destinatario.id,
        'nome_destinatario': body.destinatario.razao,
        'id_transportadora': body.transportadora.id,
      };

      delete body.destinatario;
      delete body.produtos;
      delete body.transportadora;
      delete body.forma_pagto;
      delete body.duplicata;
      delete body.chaves_ref;

      const result = await Nota.query().where('id', params.id).update(body);

      return result;
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async delete({ request, response, params }: HttpContextContract) {
    const id_emissor = request.input('id_emissor');

    try {
      await Database.from('notas').delete().where('id', '=', params.id).andWhere('id_emissor', '=', id_emissor);
      response.status(201);
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async duplicar({ request, params }: HttpContextContract) {
    const regex = new RegExp(/^\d+$/);
    const id_emissor = request.input('id_emissor');

    try {
      const nota = await Nota.findOrFail(params.id);
      const novaNota = nota.toJSON();

      //Pega o último código
      const maxCod = await Database.from('notas').max('cod').where('id_emissor', '=', id_emissor);
      const { max } = maxCod[0];

      delete novaNota.id;
      delete novaNota.caminho_xml;
      delete novaNota.caminho_pdf;
      delete novaNota.caminho_pdf_cce;
      delete novaNota.chave_acesso;
      delete novaNota.protocolo;
      delete novaNota.created_at;
      delete novaNota.updated_at;

      novaNota.status = 'Em digitação';

      if (regex.test(max)) novaNota.cod = lpad((parseInt(max) + 1).toString());
      else novaNota.cod = '';

      //Cria a nova nota
      const result = await Nota.create(novaNota);

      //Cria os produtos da nota
      const produtos = await Database.from('nf_produtos').where('id_nfe', '=', nota.id);

      for (let i = 0; i < produtos.length; i++) {
        const produto = produtos[i];
        delete produto.id;
        delete produto.created_at;
        delete produto.updated_at;
        produto.id_nfe = result.id;

        await NfProduto.create(produto);
      }

      //Cria as formas de pag
      const formas = await Database.from('nf_pagtos').where('id_nfe', '=', nota.id);

      for (let i = 0; i < formas.length; i++) {
        const forma = formas[i];
        delete forma.id;
        delete forma.created_at;
        delete forma.updated_at;
        forma.id_nfe = result.id;

        await NfPagto.create(forma);
      }

      //Cria as duplicatas
      const duplicatas = await Database.from('nf_duplicatas').where('id_nfe', '=', nota.id);

      for (let i = 0; i < duplicatas.length; i++) {
        const duplicata = duplicatas[i];
        delete duplicata.id;
        delete duplicata.created_at;
        delete duplicata.updated_at;
        duplicata.id_nfe = result.id;

        await NfDuplicata.create(duplicata);
      }

      //Cria as chaves referenciadas
      const chaves = await Database.from('nf_referenciadas').where('id_nfe', '=', nota.id);

      for (let i = 0; i < chaves.length; i++) {
        const chave = chaves[i];
        delete chave.id;
        delete chave.created_at;
        delete chave.updated_at;
        chave.id_nfe = result.id;

        await NfReferenciada.create(chave);
      }

    } catch (error: any) {
      throw new Exception(error);
    }
  }
}