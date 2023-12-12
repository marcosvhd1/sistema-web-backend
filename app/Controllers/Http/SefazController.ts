import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

declare const fetch: any;

export default class SefazController {

  public async preview({ request }: HttpContextContract) {
    const body = {
      idNF: request.input('id_nfe'),
      idEmissor: request.input('id_emissor'),
      modelNF: request.input('model'),
    };

    try {
      const response = await fetch('http://localhost:80/osmini-backend-php/nf-preview.php', {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();

      return json;
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async status_servidor({ request }: HttpContextContract) {
    const body = { 
      idEmissor: request.input('id_emissor'), 
    };

    try {
      const response = await fetch('http://localhost:80/osmini-backend-php/status.php', {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const json = await response.json();

      return json;
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async emitir({ request }: HttpContextContract) {
    const body = {
      idNF: request.input('id_nfe'),
      idEmissor: request.input('id_emissor'),
      modelNF: request.input('model'),
    };

    try {
      const response = await fetch('http://localhost:80/osmini-backend-php/nf-emitir.php', {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();

      return json;
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async cancelar({ request }: HttpContextContract) {
    const body = {
      idNF: request.input('id_nfe'),
      idEmissor: request.input('id_emissor'),
      justify: request.input('justificativa'),
      modelNF: request.input('model'),
    };

    try {
      const response = await fetch('http://localhost:80/osmini-backend-php/nf-cancelar.php', {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();

      return json;
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async inutilizar({ request }: HttpContextContract) {
    const body = {
      serie: request.input('serie'),
      justify: request.input('justificativa'),
      idEmissor: request.input('id_emissor'),
      numeroIni: request.input('numero_inicial'),
      numeroFin: request.input('numero_final'),
    };

    try {
      const response = await fetch('http://localhost:80/osmini-backend-php/nf-inutilizar.php', {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();

      return json;
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async cce({ request }: HttpContextContract) {
    const body = {
      idNF: request.input('id_nfe'),
      correcao: request.input('correcao'),
      idEmissor: request.input('id_emissor'),
      numeroSeqEvento: request.input('seq_evento'),
    };

    try {
      const response = await fetch('http://localhost:80/osmini-backend-php/nf-cce.php', {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();

      return json;
    } catch (error: any) {
      throw new Exception(error);
    }
  }
}