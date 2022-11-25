import { DateTime } from 'luxon';
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm';
import Database from '@ioc:Adonis/Lucid/Database';

export default class Servico extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public id_emissor: number;

  @column()
  public nserv: number;

  @column()
  public descricao: string;

  @column()
  public un: string;

  @column()
  public preco: number;

  @column()
  public anotacoes: string;

  @column()
  public base_iss: number;

  @column()
  public aliquota_iss: number;

  @column()
  public status: string;

  @column()
  public item_lista: string;

  @column()
  public ncm: string;

  @column()
  public situacao: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeCreate()
  public static async createNServ(Servico: Servico) {
    try {
      const lastNServ = await Database.rawQuery('select max(nserv) from servicos');
      const { max } = lastNServ['rows'][0];
      Servico.nserv = max+1;
    } catch (error) {
      return false;
    }
  }
}
