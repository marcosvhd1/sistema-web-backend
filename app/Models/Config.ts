import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class Config extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public id_emissor: number;

  @column()
  public cert_base64: string;

  @column()
  public cert_senha: string;
  
  @column()
  public ambiente: string;
  
  @column()
  public tipo_imp: string;
  
  @column()
  public forma_emi: string;
  
  @column()
  public finalidade: string;
  
  @column()
  public justif: string;

  @column()
  public id_nfce: string;
  
  @column()
  public token_nfce: string;
  
  @column()
  public serie_padrao: string;
  
  @column()
  public aliq_aprov_icms: string;
  
  @column()
  public email_remetente: string;
  
  @column()
  public email: string;
  
  @column()
  public host: string;
  
  @column()
  public usuario: string;
  
  @column()
  public senha: string;
  
  @column()
  public porta: string;
  
  @column()
  public copia: string;
  
  @column()
  public assunto: string;
  
  @column()
  public mensagem: string;

  @column()
  public autenticacao: boolean;
  
  @column()
  public ssl: boolean;
  
  @column()
  public tls: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
