import { DateTime } from 'luxon';
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm';
import Database from '@ioc:Adonis/Lucid/Database';

export default class Cliente extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public id_emissor: number;

  @column()
  public cod: number;

  @column()
  public tipo: string;

  @column()
  public categoria: string;

  @column()
  public razao: string;

  @column()
  public fantasia: string;

  @column()
  public cnpjcpf: string;

  @column()
  public rg: string;

  @column()
  public datanasc: string;

  @column()
  public ie: string;

  @column()
  public im: string;

  @column()
  public suframa: string;

  @column()
  public tipo_contribuinte: string;

  @column()
  public logradouro: string;

  @column()
  public numero: string;

  @column()
  public bairro: string;

  @column()
  public cep: string;

  @column()
  public uf: string;

  @column()
  public cidade: string;

  @column()
  public id_cidade: number;

  @column()
  public complemento: string;

  @column()
  public observacao: string;

  @column()
  public tipo_telefone1: string;

  @column()
  public tipo_telefone2: string;

  @column()
  public tipo_telefone3: string;

  @column()
  public telefone1: string;

  @column()
  public telefone2: string;

  @column()
  public telefone3: string;

  @column()
  public pais: string;

  @column()
  public cod_pais: string;

  @column()
  public email1: string;

  @column()
  public email2: string;

  @column()
  public site: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeCreate()
  public static async createCod(Cliente: Cliente) {
    try {
      const lastCod = await Database.rawQuery(`select max(cod) from clientes where id_emissor = ${Cliente.id_emissor}`);
      const { max } = lastCod['rows'][0];
      Cliente.cod = max+1;
    } catch (error) {
      return false;
    }
  }
}
