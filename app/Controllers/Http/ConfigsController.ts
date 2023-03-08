import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import Config from 'App/Models/Config';

export default class ConfigsController {
  public async save({ request, response }: HttpContextContract) {
    const body = request.body();

    try {
      const data = await Config.findBy('id_emissor', body.id_emissor);

      if (data != null) {
        await data.fill(body).save();
      } else {
        await Config.create(request.body());
      }

      response.status(201);
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async getByEmissor({ request }: HttpContextContract) {
    const id_emissor = request.input('id_emissor');

    try {
      const data = await Config.findBy('id_emissor', id_emissor);

      return data;
    } catch (error: any) {
      throw new Exception(error);
    }
  }
}
