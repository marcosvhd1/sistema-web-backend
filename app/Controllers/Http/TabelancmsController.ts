import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Tabelancm from 'App/Models/Tabelancm';

export default class TabelancmsController {   
  public async save({ request, response }: HttpContextContract) {
    const body = request.body();
    
    try {
      const data = await Tabelancm.query().where('codigo', body.codigo).where('id_emissor', body.id_emissor);
    
      if (data.length > 0) {
        await Tabelancm.query().where('codigo', body.codigo).where('id_emissor', body.id_emissor).update(body);
      } else {
        await Tabelancm.create(request.body());
      }
    
      response.status(201);
    } catch (error: any) {
      throw new Exception(error);
    }
  }
}