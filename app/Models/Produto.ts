import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class Produto extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public id_emissor: number;

  @column()
  public nprod: number;

  @column()
  public descricao: string;

  @column()
  public referencia: string;

  @column()
  public codbarras: string;

  @column()
  public marca: string;

  @column()
  public grupo: string;

  @column()
  public preco: number;

  @column()
  public preco_trib: number;

  @column()
  public un: string;

  @column()
  public un_trib: string;

  @column()
  public status: string;

  @column()
  public anotacoes: string;

  @column()
  public cst_icms: string;

  @column()
  public aliquota_icms: number;

  @column()
  public base_icms: number;

  @column()
  public cst_ipi: string;

  @column()
  public aliquota_ipi: number;

  @column()
  public cst_cofins: string;

  @column()
  public aliquota_cofins: number;

  @column()
  public cst_pis: string;

  @column()
  public aliquota_pis: number;

  @column()
  public info_adicional: string;

  @column()
  public ncm: string;

  @column()
  public cest: string;

  @column()
  public cnpj_produtor: string;

  @column()
  public producao_propria: string;

  @column()
  public cfop: string;

  @column()
  public origem: string;

  @column()
  public peso_bruto: number;

  @column()
  public peso_liquido: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
