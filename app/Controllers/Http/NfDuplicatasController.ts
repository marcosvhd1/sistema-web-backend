import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';

import NfDuplicata from 'App/Models/NfDuplicata';

export default class NfDuplicatasController {

  public async get({ request }: HttpContextContract) {
    const id_nfe = request.input('id_nfe');
        
    try {
      const data = await Database.from('nf_duplicatas').select('*').where('id_nfe', '=', id_nfe).orderBy('id');
    
      return data;      
    } catch (error: any) {
      throw new Exception(error);
    }
  }
        
  public async create({ request, response }: HttpContextContract) {
    const body = request.body();
          
    try {    
      await NfDuplicata.create(body);
    
      response.status(201);
    } catch (error: any) {
      throw new Exception(error);
    }
  }
        
  public async delete({ response, request }: HttpContextContract) {
    const id_nfe = request.input('id_nfe');
    
    try {
      await Database.from('nf_duplicatas').delete().where('id_nfe', '=', id_nfe);
    
      response.status(201);
    } catch (error: any) {
      throw new Exception(error);
    }
  }
}
