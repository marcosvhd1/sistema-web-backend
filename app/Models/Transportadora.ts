import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class Transportadora extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public id_emissor: number;

  @column()
  public cod: number;

  @column()
  public razao: string;

  @column()
  public fantasia: string;

  @column()
  public cnpjcpf: string;

  @column()
  public ie: string;

  @column()
  public rntrc: string;

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
  public tipo_telefone1: string;

  @column()
  public tipo_telefone2: string;

  @column()
  public telefone1: string;

  @column()
  public telefone2: string;

  @column()
  public anotacoes: string;

  @column()
  public placa: string;

  @column()
  public uf_placa: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
