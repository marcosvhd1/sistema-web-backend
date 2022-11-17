import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';

import Produto from 'App/Models/Produto';

export default class ProdutosController {

  public async getProdutos({ request, response }: HttpContextContract) {

    const page = request.input('page', 1);
    const limit = request.input('limit');

    const data = await Database.from('produtos').orderBy('id').paginate(page, limit);

    response.header('qtd', data.total);

    return data.all();
  }

  public async getProdutoById({ params }: HttpContextContract) {

    return await Produto.find(params.id) ?? false;
  }

  public async setProduto({ request, response }: HttpContextContract) {

    await Produto.create(request.body());

    response.status(201);

    return true;
  }

  public async updateProduto({ request, params }: HttpContextContract) {
    const body = request.body();

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

      return true;
    }

    return false;
  }

  public async deleteProduto({ params }: HttpContextContract) {

    const data = await Produto.find(params.id);

    if (data != null) {
      await data.delete();

      return true;
    }

    return false;
  }

  public async maxNProd() {

    const maxNProd = await Database.rawQuery('select max(nprod) from produtos');

    return maxNProd;
  }

  public async searchFilter({ request, response }: HttpContextContract) {
    const { filter, description } = request.qs();

    const page = request.input('page', 1);
    const limit = request.input('limit');

    const data = await Database.from('produtos').select('*').where(filter, 'ilike', `%${description.toUpperCase()}%`).orderBy('id').paginate(page, limit);
    response.header('qtd', data.total);

    return data.all();
  }
}
