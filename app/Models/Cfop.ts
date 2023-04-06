import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class Cfop extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public id_emissor: number;

  @column()
  public cfop_dentro: string;

  @column()
  public cfop_fora: string;

  @column()
  public natureza: string;

  @column()
  public info: string;

  @column()
  public calc_icms: string;

  @column()
  public calc_icms_st: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
