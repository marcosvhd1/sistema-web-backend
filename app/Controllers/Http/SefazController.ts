import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

declare const fetch: any;

export default class SefazController {

  public async preview({ request }: HttpContextContract) {
    const body = {
      uuidNotaFiscal: request.input('id_nfe'),
      uuidEmissor: request.input('id_emissor'),
    };

    try {
      const response = await fetch('http://localhost:80/osmini-backend-php/RecebeDadosPreview.php', {
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
      uuidEmissor: request.input('id_emissor'), 
    };

    try {
      const response = await fetch('http://localhost:80/osmini-backend-php/RecebeEventoStatusServidor.php', {
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
      uuidNotaFiscal: request.input('id_nfe'),
      uuidEmissor: request.input('id_emissor'),
      modelNF: request.input('model'),
    };

    try {
      const response = await fetch('http://localhost:80/osmini-backend-php/RecebeDadosEmissao.php', {
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
      uuidNotaFiscal: request.input('id_nfe'),
      uuidEmissor: request.input('id_emissor'),
      justificativa: request.input('justificativa'),
    };

    try {
      const response = await fetch('http://localhost:80/osmini-backend-php/RecebeDadosCancela.php', {
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
      uuidEmissor: request.input('id_emissor'),
      justificativa: request.input('justificativa'),
      numeroIni: request.input('numero_inicial'),
      numeroFin: request.input('numero_final'),
      serie: request.input('serie'),
    };

    try {
      const response = await fetch('http://localhost:80/osmini-backend-php/RecebeDadosInutilizar.php', {
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
      correcao: request.input('correcao'),
      uuidNotaFiscal: request.input('id_nfe'),
      uuidEmissor: request.input('id_emissor'),
      numeroSeqEvento: request.input('seq_evento'),
    };

    try {
      const response = await fetch('http://localhost:80/osmini-backend-php/RecebeDadosCCE.php', {
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