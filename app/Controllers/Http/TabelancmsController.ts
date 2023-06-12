import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';
import Tabelancm from 'App/Models/Tabelancm';

interface ITabelaNCM {
  id_emissor: number;
  codigo: string;
  tipo: string;
  municipal: string;
  estadual: string;
  nacionalfederal: string;
  importadosfederal: string;
}

export default class TabelancmsController {

  public async save({ request, response }: HttpContextContract) {
    const id_emissor = request.input('id_emissor');
    const body = request.body();

    const transacao = await Database.transaction();
    
    try {

      for (let index = 0; index < body.length; index++) {
        const element: ITabelaNCM = body[index];
        
        const ncm: ITabelaNCM = {
          'id_emissor': id_emissor,
          'codigo': element.codigo,
          'tipo': element.tipo,
          'municipal': element.municipal,
          'estadual': element.estadual,
          'nacionalfederal': element.nacionalfederal,
          'importadosfederal': element.importadosfederal,
        };
        
        const data = await Tabelancm.query().where('codigo', ncm.codigo).where('id_emissor', ncm.id_emissor);
        
        if (data.length > 0) await Tabelancm.query().useTransaction(transacao).where('codigo', ncm.codigo).where('id_emissor', ncm.id_emissor).update(ncm);
        else await transacao.insertQuery().table('tabelancms').insert(ncm);
      }
    
      await transacao.commit();
      response.status(201);
    } catch (error: any) {
      await transacao.rollback();
      throw new Exception(error);
    }
  }
}