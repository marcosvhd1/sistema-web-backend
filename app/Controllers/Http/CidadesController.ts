import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';

export default class CidadesController {

  public async get({ request }: HttpContextContract) {
    const { uf } = request.qs();

    try {
      const data = await Database.from('cidades').select('*').where('uf', '=', `${uf}`).orderBy('nome');
      return data;
    } catch (error: any) {
      throw new Exception(error);
    }
  }
}
