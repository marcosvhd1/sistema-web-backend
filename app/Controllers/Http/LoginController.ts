import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import Database from '@ioc:Adonis/Lucid/Database';
import Empresa from 'App/Models/Empresa';

export default class LoginController {
  public async auth({ auth, request, response }: HttpContextContract) {
    const cnpjcpf = request.input('cnpjcpf');
    const emailRequest = request.input('email');
    const password = request.input('password');

    try {
      const { id } = await Empresa.findByOrFail('cnpjcpf', cnpjcpf);

      const users = await Database.from('usuarios').where('id_empresa', '=', id);

      const user = users.find((e) => emailRequest.includes(e.email));

      const token = await auth.use('api').attempt(emailRequest, password, {
        expiresIn: '1 day',
      });

      const data = {
        autenticado: true,
        admin: user.tipo_admin === 1 ? 1 : 0,
        token: token,
      };

      return data;

    } catch (e: any) {
      return response.unauthorized('Credenciais inválidas');
    }
  }
}
