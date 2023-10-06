import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';

export default class RelatoriosController {
  public async generate({ request }: HttpContextContract) {
    const estilo = request.input('estilo');
    const cliente = request.input('cliente');
    const cfop = request.input('cfop');
    const dataIni = request.input('dataIni');
    const dataFim = request.input('dataFim');
    const modelo55 = request.input('modelo55') === 'true';
    const modelo65 = request.input('modelo65') === 'true';
    const entrada = request.input('entrada') === 'true';
    const saida = request.input('saida') === 'true';
    const enviada = request.input('enviada') === 'true';
    const digitacao = request.input('digitacao') === 'true';
    const cancelada = request.input('cancelada') === 'true';
    const inutilizada = request.input('inutilizada') === 'true';
    const id_emissor = request.input('id_emissor');

    try {
      let whereSql = `notas.id_emissor = ${id_emissor}`;

      if (cliente != '') whereSql += ` AND notas.nome_destinatario like '%${cliente}%'`;
      if (cfop != '') whereSql += ` AND notas.cfop = '${cfop}'`;
      if (dataIni != '' && dataFim != '') whereSql += ` AND notas.data_emissao BETWEEN '${dataIni}' AND '${dataFim}'`;

      //MODELO
      if (modelo55 && modelo65) null;
      else {
        if (modelo55) whereSql += ' AND notas.modelo = \'55\'';
        else if (modelo65) whereSql += ' AND notas.modelo = \'65\'';
      }

      //TIPO
      if (entrada && saida) null;
      else {
        if (entrada) whereSql += ' AND notas.tipo = \'0\'';
        else if (saida) whereSql += ' AND notas.tipo = \'1\'';
      }

      //STATUS
      if (enviada && digitacao && cancelada && inutilizada) null;
      else if (enviada || digitacao || cancelada || inutilizada) {
        whereSql += ' AND notas.status IN (';
        
        if (enviada) whereSql += '\'Enviada\',';
        if (digitacao) whereSql += '\'Em digitação\',';
        if (cancelada) whereSql += '\'Cancelada\',';
        if (inutilizada) whereSql += '\'Inutilizada\',';
        
        whereSql += '\'\')';
      }
      
      const notas = await Database.from('notas')
        .select('*')
        .whereRaw(whereSql);

      if (estilo === '1') return notas;
      else {
        return await Database.from('notas')
          .join('nf_produtos', 'notas.id', '=', 'nf_produtos.id_nfe')
          .select('*')
          .whereRaw(whereSql);
      }
      
    } catch (error: any) {
      throw new Exception(error);
    }
  }
}