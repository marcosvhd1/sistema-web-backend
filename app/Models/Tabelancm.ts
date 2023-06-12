import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class Tabelancm extends BaseModel {
  @column({ isPrimary: true })
  public id: number;
  
  @column()
  public id_emissor: number;
  
  @column()
  public codigo: string;
  
  @column()
  public tipo: string;
  
  @column()
  public municipal: number;
  
  @column()
  public estadual: number;
  
  @column()
  public nacionalfederal: number;
  
  @column()
  public importadosfederal: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
