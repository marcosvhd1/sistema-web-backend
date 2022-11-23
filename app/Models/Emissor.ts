import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class Emissor extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public id_empresa: number;

  @column()
  public razao: string;

  @column()
  public cnpjcpf: string;

  @column()
  public cnpjcpf_principal: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
