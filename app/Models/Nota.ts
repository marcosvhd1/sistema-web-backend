import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class Nota extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public id_emissor: number;

  @column()
  public cod: number;

  @column()
  public tipo: string;

  @column()
  public serie: number;

  @column()
  public natureza_operacao: string;

  @column()
  public cfop: string;

  @column()
  public forma_emissao: string;

  @column()
  public finalidade: string;

  @column()
  public status: string;

  @column()
  public modelo: number;

  @column()
  public consumidor_final: string;

  @column()
  public id_destinatario: string;
  
  @column()
  public nome_destinatario: string;

  @column()
  public data_emissao: string;

  @column()
  public data_saida: string;

  @column()
  public hora: string;

  @column()
  public competencia: string;

  @column()
  public base_calc_icms: number;

  @column()
  public total_icms: number;

  @column()
  public base_icms_st: number;

  @column()
  public total_icms_st: number;

  @column()
  public total_frete: number;

  @column()
  public valor_seguro: number;

  @column()
  public outras_despesas: number;

  @column()
  public total_ii: number;

  @column()
  public total_ipi: number;

  @column()
  public total_pis: number;

  @column()
  public total_cofins: number;

  @column()
  public total_desconto_produtos: number;

  @column()
  public total_desconto_servicos: number;

  @column()
  public total_desconto_nf: number;

  @column()
  public total_produtos: number;

  @column()
  public total_nota: number;

  @column()
  public base_calc_iss: number;

  @column()
  public total_iss: number;

  @column()
  public total_servicos: number;

  @column()
  public aliquota_credito: number;

  @column()
  public valor_credito: number;

  @column()
  public retencao_pis: number;

  @column()
  public retencao_cofins: number;

  @column()
  public retencao_csll: number;

  @column()
  public base_calc_irrf: number;

  @column()
  public retencao_irrf: number;

  @column()
  public base_prev_social: number;

  @column()
  public ret_prov_social: number;

  @column()
  public partilha_icms_dest: number;

  @column()
  public partilha_icms_rem: number;

  @column()
  public fcp_uf_dest: number;

  @column()
  public total_ipi_devolvido: number;

  @column()
  public total_fcp: number;

  @column()
  public total_fcp_st: number;

  @column()
  public presenca_comprador: string;

  @column()
  public modalidade_frete: string;

  @column()
  public id_transportadora: string;

  @column()
  public quantidade_transporte: string;

  @column()
  public numero_transporte: string;

  @column()
  public especie_transporte: string;

  @column()
  public marca_transporte: string;

  @column()
  public peso_bruto: string;

  @column()
  public peso_liquido: string;

  @column()
  public info_adicionais: string;

  @column()
  public fonte_valor_aprox_tributos: string;

  @column()
  public ecf_referenciado: string;

  @column()
  public n_coo: string;

  @column()
  public caminho_xml: string;

  @column()
  public chave_acesso: string;

  @column()
  public uf_embarque: string;

  @column()
  public local_embarque: string;

  @column()
  public local_despacho: string;

  @column()
  public uf_saida: string;

  @column()
  public local_saida: string;

  @column()
  public num_di: string;

  @column()
  public data_di: Date;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
