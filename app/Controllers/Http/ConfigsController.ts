import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import Config from 'App/Models/Config';

export default class ConfigsController {
    public async create({ request, response }: HttpContextContract) {
        try {
            await Config.create(request.body());
            response.status(201);
        } catch (error: any) {
            throw new Exception(error);
        }
    }
}
