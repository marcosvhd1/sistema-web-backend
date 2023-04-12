import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class NfProduto extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public id_nfe: number;

  @column()
  public id_produto: number;

  @column()
  public descricao: string;

  @column()
  public info_adicional: string;

  @column()
  public ncm: string;

  @column()
  public un: string;

  @column()
  public cfop: string;

  @column()
  public cest: string;

  @column()
  public quantidade: number;

  @column()
  public valor_unitario: number;

  @column()
  public valor_total: number;

  @column()
  public desconto_p: number;

  @column()
  public desconto_total: number;

  @column()
  public p_reducao_base_icms: number;

  @column()
  public valor_icms: number;

  @column()
  public p_aliquota_credito: number;

  @column()
  public credito_icms_aproveitado: number;

  @column()
  public mod_det_bc_icms: string;

  @column()
  public mod_det_bc_icms_st: string;

  @column()
  public p_margem_vlr_adc_icms_st: number;

  @column()
  public p_reducao_base_icms_st: number;

  @column()
  public base_icms_st: number;

  @column()
  public aliquota_icms_st: number;

  @column()
  public valor_icms_st: number;

  @column()
  public base_calc_retido_ant: number;

  @column()
  public icms_st_retido_ant: number;

  @column()
  public ean: string;

  @column()
  public pedido_compra: string;

  @column()
  public item: string;

  @column()
  public base_calc_ipi: number;

  @column()
  public valor_ipi: number;

  @column()
  public cnpj_produtor: string;

  @column()
  public base_calc_ii: number;

  @column()
  public desp_aduaneiras: number;

  @column()
  public valor_iof: number;

  @column()
  public valor_ii: number;

  @column()
  public base_calc_pis: number;

  @column()
  public valor_pis: number;

  @column()
  public base_calc_cofins: number;

  @column()
  public valor_cofins: number;

  @column()
  public ipi_p_devolvida: number;

  @column()
  public ipi_vlr_devolvido: number;

  @column()
  public fcp_base_calc: number;

  @column()
  public fcp_p: number;

  @column()
  public fcp_valor: number;

  @column()
  public fcp_base_calc_st: number;

  @column()
  public fcp_p_st: number;

  @column()
  public fcp_valor_st: number;

  @column()
  public partilha_icms_base_calc: number;

  @column()
  public partilha_icms_aliquota_fcp_uf_dest: number;
  
  @column()
  public partilha_icms_valor_fcp_uf_dest: number;

  @column()
  public partilha_icms_aliquota_interna_icms_uf_dest: number;

  @column()
  public partilha_icms_aliquota_icms_interestadual: number;

  @column()
  public partilha_icms_p_partilha: string;

  @column()
  public partilha_icms_valor_icms_uf_dest: number;

  @column()
  public partilha_icms_valor_icms_uf_ori: number;

  @column()
  public cst_icms: string;

  @column()
  public cst_ipi: string;

  @column()
  public cst_cofins: string;

  @column()
  public cst_pis: string;

  @column()
  public aliquota_icms: number;

  @column()
  public aliquota_ipi: number;

  @column()
  public aliquota_cofins: number;

  @column()
  public aliquota_pis: number;

  @column()
  public cod_anp: string;

  @column()
  public descricao_anp: string;

  @column()
  public uf_consumo: string;
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
