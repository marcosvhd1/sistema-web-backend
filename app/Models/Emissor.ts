import { DateTime } from 'luxon';
import { afterCreate, BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm';
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
          cnpjcpf: emissor.cnpjcpf
        });

        await Usuario.create({
          id_empresa: empresa.id,
          email: 'ADMIN',
          password: '1234',
          tipo_admin: 1,
          ultimo_emissor_selecionado: 1,
        });

        emissor.id_empresa = empresa.id;
      }
    } catch (error) {
      console.log(error);

    }
  }

  @afterCreate()
  public static async createEmissorUsuario(emissor: Emissore) {
    const usersAdmins = await Database.from('usuarios').where('tipo_admin', '=', 1).where('id_empresa', '=', emissor.id_empresa);

    usersAdmins.forEach(async user => {
      await EmissorUsuario.create({
        id_usuario: user.id,
        id_emissor: emissor.id,
      });
    });
  }
}
