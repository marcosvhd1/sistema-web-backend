import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';

export default class RelatoriosController {
    public async generate({ request }: HttpContextContract) {
        const id_emissor = request.input('id_emissor');
        
        const { 
            cliente, 
            cfop, 
            dataIni, 
            dataFim, 
            modelo55, 
            modelo65, 
            tipo1, 
            tipo2,
            enviada,
            digitacao,
            cancelada,
            inutilizada 
        } = request.qs();

        const whereCliente = ` and nome_destinatario = '${cliente}'`;
        const whereCFOP = ` and cfop = '${cfop}'`;
        const whereEmissao = ` and data_emissao between '${dataIni}' and '${dataFim}'`;
        const whereModelo55 = ` and modelo = '55'`;
        const whereModelo65 = ` and modelo = '65'`;
        const whereTipo1 = ` and tipo = '1'`;
        const whereTipo2 = ` and tipo = '0'`;
        const whereEnviada = ` and status = 'Enviada'`;
        const whereDigitacao = ` and status = 'Em digitação'`;
        const whereCancelada = ` and status = 'Cancelada'`;
        const whereInutilizada = ` and status = 'Inutilizada'`;

        try {
            let whereSql = `id_emissor = ${id_emissor}`;

            if (cliente != undefined) whereSql += whereCliente;
            if (cfop != undefined) whereSql += whereCFOP;
            if (dataIni != undefined && dataFim != undefined) whereSql += whereEmissao;

            //MODELO
            if (!modelo55 && !modelo65) {
                //NAO PRECISA DE WHERE
            } else {
                if (modelo55) whereSql += whereModelo55;
                else if (modelo65) whereSql += whereModelo65;
            }

            //TIPO
            if (!tipo1 && !tipo2) {
                //NAO PRECISA DE WHERE
            } else {
                if (tipo1) whereSql += whereTipo1;
                else if (tipo2) whereSql += whereTipo2;
            }

            //STATUS
            if (!enviada && !digitacao && !cancelada && !inutilizada) {
                //NAO PRECISA DE WHERE
            } else {
                if (enviada) whereSql += whereEnviada;
                else if (digitacao) whereSql += whereDigitacao;
                else if (cancelada) whereSql += whereCancelada;
                else if (inutilizada) whereSql += whereInutilizada;
            }

            const notas = await Database.from('notas').select('*').whereRaw(whereSql);

            return notas;
        } catch (error: any) {
            throw new Exception(error);
        }
    }
}