import Hash from '@ioc:Adonis/Core/Hash';
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm';
import { DateTime } from 'luxon';

export default class Usuario extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public id_empresa: number;

  @column()
  public email: string;

  @column({ serializeAs: null })
  public password: string;

  @column()
  public tipo_admin: number;

  @column()
  public ultimo_emissor_selecionado: number;

  @column()
  public rememberMeToken: string | null;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeSave()
  public static async hashPassword (usuario: Usuario) {
    if (usuario.$dirty.password) {
      usuario.password = await Hash.make(usuario.password);
    }
  }
}
