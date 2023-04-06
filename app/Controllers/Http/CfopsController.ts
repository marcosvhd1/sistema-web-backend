import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';

import Cfop from 'App/Models/Cfop';

export default class CfopsController {
  
  public async get({ request }: HttpContextContract) {
    const id_emissor = request.input('id_emissor');
        
    try {
      const data = await Database.from('cfops').select('*').where('id_emissor', '=', id_emissor).orderBy('id');
      return data;      
    } catch (error: any) {
      throw new Exception(error);
    }
  }
        
  public async create({ request, response }: HttpContextContract) {
    const body = request.body();
          
    try {    
      await Cfop.create(body);
      response.status(201);
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async update({ request, params }: HttpContextContract) {
    const body = request.body();

    try {
      const data = await Cfop.find(params.id);
      if (data != null) await data.fill(body).save();
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async delete({ params, request }: HttpContextContract) {
    const id_emissor = request.input('id_emissor');

    try {
      await Database.from('cfops').delete().where('id', '=', params.id).andWhere('id_emissor', '=', id_emissor);
    } catch (error: any) {
      throw new Exception(error);
    }
  }
}
