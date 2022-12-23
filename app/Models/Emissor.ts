import { DateTime } from 'luxon';
import { afterCreate, afterUpdate, BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm';
import Database from '@ioc:Adonis/Lucid/Database';
import Empresa from './Empresa';
import Usuario from './Usuario';
import EmissorUsuario from './EmissorUsuario';

export default class Emissore extends BaseModel {
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

  @column()
  public status: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeCreate()
  public static async createEmissor(emissor: Emissore) {
    try {
      const data = await Database.from('empresas').where('cnpjcpf', '=', emissor.cnpjcpf_principal);

      if (data.length !== 0) {
        emissor.id_empresa = data[0].id;
      } else {
        const empresa = await Empresa.create({
          cnpjcpf: emissor.cnpjcpf_principal
        });

        await Usuario.create({
          id_empresa: empresa.id,
          email: 'ADMIN',
          password: '1234',
          tipo_admin: 1,
          ultimo_emissor_selecionado: 1,
          usuario_principal: 'Sim',
          status: 'Ativo'
        });

        emissor.id_empresa = empresa.id;
        emissor.status = 'Ativo';
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }

  @afterCreate()
  public static async createEmissorUsuario(emissor: Emissore) {
    try {
      const usersAdmins = await Database.from('usuarios').where('tipo_admin', '=', 1).where('id_empresa', '=', emissor.id_empresa);

      usersAdmins.forEach(async user => {
        await EmissorUsuario.create({
          id_usuario: user.id,
          id_emissor: emissor.id,
        });
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  @afterUpdate()
  public static async teste(emissor: Emissore) {
    const id = emissor.id;
    if (emissor.status === 'Inativo') {
      try {
        const usersByEmi = await Database.from('usuarios').where('ultimo_emissor_selecionado', '=', id);
        usersByEmi.forEach(async e => {
          await Database.rawQuery(
            'update usuarios set ultimo_emissor_selecionado = 0 where id = ?',
            [e.id]
          );
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

}
