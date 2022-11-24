import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';

import Produto from 'App/Models/Produto';

export default class ProdutosController {

  public async max({ request }: HttpContextContract) {
    const id_emissor = request.input('id_emissor');

    try {
      const max = await Database.from('produtos').select('max(nprod)').where('id_emissor', '=', id_emissor);
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
      const data = await Database.from('produtos').select('*').where(filter, 'ilike', `%${description.toUpperCase()}%`).where('id_emissor', '=', id_emissor).orderBy('id').paginate(page, limit);
      response.header('qtd', data.total);
      return data.all();
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async create({ request, response }: HttpContextContract) {
    try {
      await Produto.create(request.body());
      response.status(201);
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async update({ request, params }: HttpContextContract) {
    const body = request.body();

    try {
      const data = await Produto.find(params.id);

      if (data != null) {
        data.id_emissor = body.id_emissor;
        data.nprod = body.nprod;
        data.descricao = body.descricao;
        data.referencia = body.referencia;
        data.codbarras = body.codbarras;
        data.marca = body.marca;
        data.grupo = body.grupo;
        data.preco = body.preco;
        data.preco_trib = body.preco_trib;
        data.un = body.un;
        data.un_trib = body.un_trib;
        data.status = body.status;
        data.anotacoes = body.anotacoes;
        data.cst_icms = body.cst_icms;
        data.aliquota_icms = body.aliquota_icms;
        data.base_icms = body.base_icms;
        data.cst_ipi = body.cst_ipi;
        data.aliquota_ipi = body.aliquota_ipi;
        data.cst_cofins = body.cst_cofins;
        data.aliquota_cofins = body.aliquota_cofins;
        data.cst_pis = body.cst_pis;
        data.aliquota_pis = body.aliquota_pis;
        data.info_adicional = body.info_adicional;
        data.ncm = body.ncm;
        data.cest = body.cest;
        data.cnpj_produtor = body.cnpj_produtor;
        data.producao_propria = body.producao_propria;
        data.cfop = body.cfop;
        data.origem = body.origem;
        data.peso_bruto = body.peso_bruto;
        data.peso_liquido = body.peso_bruto;
        await data.save();
      }
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async delete({ params, request }: HttpContextContract) {
    const id_emissor = request.input('id_emissor');

    try {
      await Database.from('produtos').delete().where('id', '=', params.id).where('id_emissor', '=', id_emissor);
    } catch (error: any) {
      throw new Exception(error);
    }
  }
}
