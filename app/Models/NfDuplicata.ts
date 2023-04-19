import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class NfDuplicata extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public id_nfe: number;

  @column()
  public numero: string;

  @column()
  public valor: string;

  @column()
  public vencimento: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
