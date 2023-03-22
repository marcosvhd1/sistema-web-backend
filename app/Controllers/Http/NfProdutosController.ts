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
    const body = request.body();

    try {
      const data = {
        'id_nfe': body.id_nfe ?? 0,
        'id_produto': body.produto.id ?? 0,
        'descricao': body.produto.descricao ?? '',
        'info_adicional': body.produto.info_adicional ?? '',
        'ncm': body.produto.ncm ?? '',
        'un': body.produto.un ?? '',
        'cfop': body.produto.cfop ?? '',
        'cest': body.produto.cest ?? '',
        'quantidade': body.quantidade ?? 0,
        'valor_unitario': body.valor_unitario ?? 0,
        'valor_total': body.valor_total ?? 0,
        'desconto_p': body.desconto_p ?? 0,
        'desconto_total': body.desconto_total ?? 0,
        'p_reducao_base_icms': body.p_reducao_base_icms ?? 0,
        'valor_icms': body.valor_icms ?? 0,
        'p_aliquota_credito': body.p_aliquota_credito ?? 0,
        'credito_icms_aproveitado': body.credito_icms_aproveitado ?? 0,
        'mod_det_bc_icms': body.mod_det_bc_icms ?? '',
        'mod_det_bc_icms_st': body.mod_det_bc_icms_st ?? '',
        'p_margem_vlr_adc_icms_st': body.p_margem_vlr_adc_icms_st ?? 0,
        'p_reducao_base_icms_st': body.p_reducao_base_icms_st ?? 0,
        'base_icms_st': body.base_icms_st ?? 0,
        'aliquota_icms_st': body.aliquota_icms_st ?? 0,
        'valor_icms_st': body.valor_icms_st ?? 0,
        'base_calc_retido_ant': body.base_calc_retido_ant ?? 0,
        'icms_st_retido_ant': body.icms_st_retido_ant ?? 0,
        'ean': body.ean ?? '',
        'pedido_compra': body.pedido_compra ?? '',
        'item': body.item ?? '',
        'base_calc_ipi': body.base_calc_ipi ?? 0,
        'valor_ipi': body.valor_ipi ?? 0,
        'cnpj_produtor': body.cnpj_produtor ?? '',
        'base_calc_ii': body.base_calc_ii ?? 0,
        'desp_aduaneiras': body.desp_aduaneiras ?? 0,
        'valor_iof': body.valor_iof ?? 0,
        'valor_ii': body.valor_ii ?? 0,
        'base_calc_pis': body.base_calc_pis ?? 0,
        'valor_pis': body.valor_pis ?? 0,
        'base_calc_cofins': body.base_calc_cofins ?? 0,
        'valor_cofins': body.valor_cofins ?? 0,
        'ipi_p_devolvida': body.ipi_p_devolvida ?? 0,
        'ipi_vlr_devolvido': body.ipi_vlr_devolvido ?? 0,
        'fcp_base_calc': body.fcp_base_calc ?? 0,
        'fcp_p': body.fcp_p ?? 0,
        'fcp_valor': body.fcp_valor ?? 0,
        'fcp_base_calc_st': body.fcp_base_calc_st ?? 0,
        'fcp_p_st': body.fcp_p_st ?? 0,
        'fcp_valor_st': body.fcp_valor_st ?? 0,
        'partilha_icms_base_calc': body.partilha_icms_base_calc ?? 0,
        'partilha_icms_aliquota_fcp_uf_dest': body.partilha_icms_aliquota_fcp_uf_dest ?? 0,
        'partilha_icms_valor_fcp_uf_dest': body.partilha_icms_valor_fcp_uf_dest ?? 0,
        'partilha_icms_aliquota_interna_icms_uf_dest': body.partilha_icms_aliquota_interna_icms_uf_dest ?? 0,
        'partilha_icms_aliquota_icms_interestadual': body.partilha_icms_aliquota_icms_interestadual ?? 0,
        'partilha_icms_p_partilha': body.partilha_icms_p_partilha ?? '',
        'partilha_icms_valor_icms_uf_dest': body.partilha_icms_valor_icms_uf_dest ?? 0,
        'partilha_icms_valor_icms_uf_ori': body.partilha_icms_valor_icms_uf_ori ?? 0,
        'cod_anp': body.cod_anp ?? '',
        'descricao_anp': body.descricao_anp ?? '',
        'uf_consumo': body.uf_consumo ?? '',
      };

      console.log(data);

      // const result = await NfProduto.create(data);

      // console.log(result);

      // return result;
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
        
  public async delete({ response, request, params }: HttpContextContract) {
    const id_nfe = request.input('id_nfe');
    
    try {
      await Database.from('nf_pagtos').delete().where('id', '=', params.id).andWhere('id_nfe', '=', id_nfe);
    
      response.status(201);
    } catch (error: any) {
      throw new Exception(error);
    }
  }
}