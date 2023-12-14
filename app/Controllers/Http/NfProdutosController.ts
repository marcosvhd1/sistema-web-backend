import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';

import NfProduto from 'App/Models/NfProduto';

export default class NfProdutosController {

  public async get({ request }: HttpContextContract) {
    const id_nfe = request.input('id_nfe');
    
    try {
      const data = await Database.from('nf_produtos').select('*').where('id_nfe', '=', id_nfe).orderBy('id');

      return data;      
    } catch (error: any) {
      throw new Exception(error);
    }
  }
        
  public async create({ request }: HttpContextContract) {
    let body = request.body();

    try {
      body = {
        ...body,
        'id_produto': body.produto.id,
        'descricao': body.produto.descricao,
        'info_adicional': body.produto.info_adicional,
        'ncm': body.produto.ncm,
        'un': body.produto.un,
        'cfop': body.produto.cfop,
        'cest': body.produto.cest,
        'codbarras': body.produto.codbarras,
        'base_icms': body.produto.base_icms,
        'cst_icms': body.produto.cst_icms,
        'cst_ipi': body.produto.cst_ipi,
        'cst_cofins': body.produto.cst_cofins,
        'cst_pis': body.produto.cst_pis,
        'aliquota_icms': body.produto.aliquota_icms,
        'aliquota_ipi': body.produto.aliquota_ipi,
        'aliquota_cofins': body.produto.aliquota_cofins,
        'aliquota_pis': body.produto.aliquota_pis,
      };

      delete body.produto;

      const result = await NfProduto.create(body);

      return result;
    } catch (error: any) { 
      throw new Exception(error);
    }
  }
        
  public async update({ request, response, params }: HttpContextContract) {
    const body = request.body();
        
    try {
      await NfProduto.query().where('id', params.id).update(body);
          
      response.status(201);
    } catch (error: any) {
      throw new Exception(error);
    }
  }
        
  public async delete({ response, request }: HttpContextContract) {
    const id_nfe = request.input('id_nfe');
    
    try {
      await Database.from('nf_produtos').delete().where('id_nfe', '=', id_nfe);
    
      response.status(201);
    } catch (error: any) {
      throw new Exception(error);
    }
  }
}