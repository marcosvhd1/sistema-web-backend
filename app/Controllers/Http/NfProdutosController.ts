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
        'id_nfe': body.id_nfe,
        'id_produto': body.produto.id,
        'descricao': body.produto.descricao,
        'info_adicional': body.produto.info_adicional,
        'ncm': body.produto.ncm,
        'un': body.produto.un,
        'cfop': body.produto.cfop,
        'cest': body.produto.cest,
        'quantidade': body.quantidade,
        'valor_unitario': body.valor_unitario,
        'valor_total': body.valor_total,
        'desconto_p': body.desconto_p,
        'desconto_total': body.desconto_total,
        'p_reducao_base_icms': body.p_reducao_base_icms,
        'valor_icms': body.valor_icms,
        'p_aliquota_credito': body.p_aliquota_credito,
        'credito_icms_aproveitado': body.credito_icms_aproveitado,
        'mod_det_bc_icms': body.mod_det_bc_icms,
        'mod_det_bc_icms_st': body.mod_det_bc_icms_st,
        'p_margem_vlr_adc_icms_st': body.p_margem_vlr_adc_icms_st,
        'p_reducao_base_icms_st': body.p_reducao_base_icms_st,
        'base_icms_st': body.base_icms_st,
        'aliquota_icms_st': body.aliquota_icms_st,
        'valor_icms_st': body.valor_icms_st,
        'base_calc_retido_ant': body.base_calc_retido_ant,
        'icms_st_retido_ant': body.icms_st_retido_ant,
        'ean': body.ean,
        'pedido_compra': body.pedido_compra,
        'item': body.item,
        'base_calc_ipi': body.base_calc_ipi,
        'valor_ipi': body.valor_ipi,
        'cnpj_produtor': body.cnpj_produtor,
        'base_calc_ii': body.base_calc_ii,
        'desp_aduaneiras': body.desp_aduaneiras,
        'valor_iof': body.valor_iof,
        'valor_ii': body.valor_ii,
        'base_calc_pis': body.base_calc_pis,
        'valor_pis': body.valor_pis,
        'base_calc_cofins': body.base_calc_cofins,
        'valor_cofins': body.valor_cofins,
        'ipi_p_devolvida': body.ipi_p_devolvida,
        'ipi_vlr_devolvido': body.ipi_vlr_devolvido,
        'fcp_base_calc': body.fcp_base_calc,
        'fcp_p': body.fcp_p,
        'fcp_valor': body.fcp_valor,
        'fcp_base_calc_st': body.fcp_base_calc_st,
        'fcp_p_st': body.fcp_p_st,
        'fcp_valor_st': body.fcp_valor_st,
        'partilha_icms_base_calc': body.partilha_icms_base_calc,
        'partilha_icms_aliquota_fcp_uf_dest': body.partilha_icms_aliquota_fcp_uf_dest,
        'partilha_icms_valor_fcp_uf_dest': body.partilha_icms_valor_fcp_uf_dest,
        'partilha_icms_aliquota_interna_icms_uf_dest': body.partilha_icms_aliquota_interna_icms_uf_dest,
        'partilha_icms_aliquota_icms_interestadual': body.partilha_icms_aliquota_icms_interestadual,
        'partilha_icms_p_partilha': body.partilha_icms_p_partilha,
        'partilha_icms_valor_icms_uf_dest': body.partilha_icms_valor_icms_uf_dest,
        'partilha_icms_valor_icms_uf_ori': body.partilha_icms_valor_icms_uf_ori,
        'cst_icms': body.produto.cst_icms,
        'cst_ipi': body.produto.cst_ipi,
        'cst_cofins': body.produto.cst_cofins,
        'cst_pis': body.produto.cst_pis,
        'aliquota_icms': body.produto.aliquota_icms,
        'aliquota_ipi': body.produto.aliquota_ipi,
        'aliquota_cofins': body.produto.aliquota_cofins,
        'aliquota_pis': body.produto.aliquota_pis,
        'cod_anp': body.cod_anp,
        'descricao_anp': body.descricao_anp,
        'uf_consumo': body.uf_consumo,
      };

      const result = await NfProduto.create(data);

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