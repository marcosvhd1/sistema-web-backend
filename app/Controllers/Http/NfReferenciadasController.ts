import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';

import NfReferenciada from 'App/Models/NfReferenciada';

export default class NfReferenciadasController {

  public async get({ request }: HttpContextContract) {
    const id_nfe = request.input('id_nfe');
        
    try {
      const data = await Database.from('nf_referenciadas').select('*').where('id_nfe', '=', id_nfe).orderBy('id');
      return data;      
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async create({ request, response }: HttpContextContract) {
    const data = request.body();

    try {
      await NfReferenciada.create(data);
      response.status(201);
    } catch (error: any) { 
      throw new Exception(error);
    }
  }

  public async delete({ request, response }: HttpContextContract) {   
    const id_nfe = request.input('id_nfe');

    try {
      await Database.from('nf_referenciadas').delete().where('id_nfe', '=', id_nfe);
      response.status(201);
    } catch (error: any) {
      throw new Exception(error);
    }
  }
}
