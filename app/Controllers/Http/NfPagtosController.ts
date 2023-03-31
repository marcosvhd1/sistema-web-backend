import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';

import NfPagto from 'App/Models/NfPagto';

export default class NfPagtosController {

  public async get({ request }: HttpContextContract) {
    const id_nfe = request.input('id_nfe');
    
    try {
      const data = await Database.from('nf_pagtos').select('*').where('id_nfe', '=', id_nfe).orderBy('id');

      return data;      
    } catch (error: any) {
      throw new Exception(error);
    }
  }
    
  public async create({ request, response }: HttpContextContract) {
    const body = request.body();
      
    try {    
      await NfPagto.create(body);

      response.status(201);
    } catch (error: any) {
      throw new Exception(error);
    }
  }
    
  public async delete({ response, request }: HttpContextContract) {
    const id_nfe = request.input('id_nfe');

    try {
      await Database.from('nf_pagtos').delete().where('id_nfe', '=', id_nfe);

      response.status(201);
    } catch (error: any) {
      throw new Exception(error);
    }
  }
}
