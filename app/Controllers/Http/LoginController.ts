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

      const user = users.find((e) => e.email === emailRequest);

      if (user.status === 'Ativo') {

        const token = await auth.use('api').attempt(emailRequest, password, {
          expiresIn: '1 day',
        });

        const data = {
          autenticado: true,
          admin: user.tipo_admin,
          token: token,
          idUser: user.id,
          ultimoEmissor: user.ultimo_emissor_selecionado,
          usuarioPrincipal: user.usuario_principal,
          status: user.status
        };

        return data;

      } else {
        return response.notAcceptable('Usuário bloqueado');
      }

    } catch (e: any) {
      return response.unauthorized('Credenciais inválidas');
    }
  }
}
