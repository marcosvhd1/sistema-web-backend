import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';

import Nota from 'App/Models/Nota';

export default class NotasController {

  public async max({ request }: HttpContextContract) {
    const id_emissor = request.input('id_emissor');

    try {
      const max = await Database.from('notas').max('cod').where('id_emissor', '=', id_emissor);
      return max;
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async getAll({ request, response }: HttpContextContract) {
    const { filter, description } = request.qs();
    const limit = request.input('limit');
    const page = request.input('page', 1);
    const dataFinal = request.input('data_final');
    const id_emissor = request.input('id_emissor');
    const filterDate = request.input('filter_date');
    const dataInicial = request.input('data_inicial');
    const filterStatus = request.input('filter_status');
    
    const whereStatus = ` and status = '${filterStatus}'`;
    const whereFilter = ` and ${filter}::TEXT ilike '%${description.toUpperCase()}%'`;
    const whereDate = ` and ${filterDate} between '${dataInicial}' and '${dataFinal}'`;

    try {
      let whereSql = `id_emissor = ${id_emissor}`;

      if (description != '') whereSql += whereFilter;
      if (filterDate != '') whereSql += whereDate;
      if (filterStatus != '') whereSql += whereStatus;

      const notas = await Database.from('notas').select('*')
        .whereRaw(whereSql)
        .orderBy('id')
        .paginate(page, limit);
      response.header('qtd', notas.total);

      return notas.all();
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async getQtdDigit({ request }: HttpContextContract) {
    const id_emissor = request.input('id_emissor');

    try {
      const notas = await Database.from('notas').count('*')
        .where('status', '=', 'Em digitação')
        .where('id_emissor', '=', id_emissor);

      return notas;
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async create({ request }: HttpContextContract) {
    try {
      const data = {
        'id_emissor': request.input('id_emissor'),
        'id_destinatario': request.input('destinatario.id'),
        'nome_destinatario': request.input('destinatario.razao'),
        'cod': request.input('cod'),
        'serie': request.input('serie'),
        'natureza_operacao': request.input('natureza_operacao'),
        'cfop': request.input('cfop'),
        'status': request.input('status'),
        'tipo': request.input('tipo'),
        'finalidade': request.input('finalidade'),
        'modelo': request.input('modelo'),
        'consumidor_final': request.input('consumidor_final'),
        'data_emissao': request.input('data_emissao'),
        'data_saida': request.input('data_saida'),
        'hora': request.input('hora'),
        'base_calc_icms': request.input('base_calc_icms'),
        'total_icms': request.input('total_icms'),
        'base_icms_st': request.input('base_icms_st'),
        'total_icms_st': request.input('total_icms_st'),
        'total_frete': request.input('total_frete'),
        'valor_seguro': request.input('valor_seguro'),
        'outras_despesas': request.input('outras_despesas'),
        'total_ipi': request.input('total_ipi'),
        'total_ii': request.input('total_ii'),
        'total_pis': request.input('total_pis'),
        'total_cofins': request.input('total_cofins'),
        'total_desconto_nf': request.input('total_desconto_nf'),
        'total_produtos': request.input('total_produtos'),
        'total_nota': request.input('total_nota'),
        'total_fcp': request.input('total_fcp'),
        'total_fcp_st': request.input('total_fcp_st'),
        'aliquota_credito': request.input('aliquota_credito'),
        'valor_credito': request.input('valor_credito'),
        'retencao_pis': request.input('retencao_pis'),
        'retencao_cofins': request.input('retencao_cofins'),
        'retencao_csll': request.input('retencao_csll'),
        'base_calc_irrf': request.input('base_calc_irrf'),
        'retencao_irrf': request.input('retencao_irrf'),
        'base_prev_social': request.input('base_prev_social'),
        'ret_prov_social': request.input('ret_prov_social'),
        'partilha_icms_dest': request.input('partilha_icms_dest'),
        'partilha_icms_rem': request.input('partilha_icms_rem'),
        'fcp_uf_dest': request.input('fcp_uf_dest'),
        'total_ipi_devolvido': request.input('total_ipi_devolvido'),
        'presenca_comprador': request.input('presenca_comprador'),
        'modalidade_frete': request.input('modalidade_frete'),
        'id_transportadora': request.input('transportadora.id'),
        'quantidade_transporte': request.input('quantidade_transporte'),
        'especie_transporte': request.input('especie_transporte'),
        'marca_transporte': request.input('marca_transporte'),
        'numero_transporte': request.input('numero_transporte'),
        'peso_bruto': request.input('peso_bruto'),
        'peso_liquido': request.input('peso_liquido'),
        'info_adicionais': request.input('info_adicionais'),
        'fonte_valor_aprox_tributos': request.input('fonte_valor_aprox_tributos'),
        'ecf_referenciado': request.input('ecf_referenciado'),
        'n_coo': request.input('n_coo'),
        'chave_acesso': request.input('chave_acesso'),
        'protocolo': request.input('protocolo'),
        'uf_embarque': request.input('uf_embarque'),
        'local_embarque': request.input('local_embarque'),
        'local_despacho': request.input('local_despacho'),
        'uf_saida': request.input('uf_saida'),
        'local_saida': request.input('local_saida'),
        'num_di': request.input('num_di'),
        'data_di': request.input('data_di'),
      };
      
      const result = await Nota.create(data);

      return result;
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async update({ request, params }: HttpContextContract) {
    const body = {
      'id_emissor': request.input('id_emissor'),
      'id_destinatario': request.input('destinatario.id'),
      'nome_destinatario': request.input('destinatario.razao'),
      'cod': request.input('cod'),
      'serie': request.input('serie'),
      'natureza_operacao': request.input('natureza_operacao'),
      'cfop': request.input('cfop'),
      'status': request.input('status'),
      'tipo': request.input('tipo'),
      'finalidade': request.input('finalidade'),
      'modelo': request.input('modelo'),
      'consumidor_final': request.input('consumidor_final'),
      'data_emissao': request.input('data_emissao'),
      'data_saida': request.input('data_saida'),
      'hora': request.input('hora'),
      'base_calc_icms': request.input('base_calc_icms'),
      'total_icms': request.input('total_icms'),
      'base_icms_st': request.input('base_icms_st'),
      'total_icms_st': request.input('total_icms_st'),
      'total_frete': request.input('total_frete'),
      'valor_seguro': request.input('valor_seguro'),
      'outras_despesas': request.input('outras_despesas'),
      'total_ipi': request.input('total_ipi'),
      'total_ii': request.input('total_ii'),
      'total_pis': request.input('total_pis'),
      'total_cofins': request.input('total_cofins'),
      'total_desconto_nf': request.input('total_desconto_nf'),
      'total_produtos': request.input('total_produtos'),
      'total_nota': request.input('total_nota'),
      'total_fcp': request.input('total_fcp'),
      'total_fcp_st': request.input('total_fcp_st'),
      'aliquota_credito': request.input('aliquota_credito'),
      'valor_credito': request.input('valor_credito'),
      'retencao_pis': request.input('retencao_pis'),
      'retencao_cofins': request.input('retencao_cofins'),
      'retencao_csll': request.input('retencao_csll'),
      'base_calc_irrf': request.input('base_calc_irrf'),
      'retencao_irrf': request.input('retencao_irrf'),
      'base_prev_social': request.input('base_prev_social'),
      'ret_prov_social': request.input('ret_prov_social'),
      'partilha_icms_dest': request.input('partilha_icms_dest'),
      'partilha_icms_rem': request.input('partilha_icms_rem'),
      'fcp_uf_dest': request.input('fcp_uf_dest'),
      'total_ipi_devolvido': request.input('total_ipi_devolvido'),
      'presenca_comprador': request.input('presenca_comprador'),
      'modalidade_frete': request.input('modalidade_frete'),
      'id_transportadora': request.input('transportadora.id'),
      'quantidade_transporte': request.input('quantidade_transporte'),
      'especie_transporte': request.input('especie_transporte'),
      'marca_transporte': request.input('marca_transporte'),
      'numero_transporte': request.input('numero_transporte'),
      'peso_bruto': request.input('peso_bruto'),
      'peso_liquido': request.input('peso_liquido'),
      'info_adicionais': request.input('info_adicionais'),
      'fonte_valor_aprox_tributos': request.input('fonte_valor_aprox_tributos'),
      'ecf_referenciado': request.input('ecf_referenciado'),
      'n_coo': request.input('n_coo'),
      'chave_acesso': request.input('chave_acesso'),
      'protocolo': request.input('protocolo'),
      'uf_embarque': request.input('uf_embarque'),
      'local_embarque': request.input('local_embarque'),
      'local_despacho': request.input('local_despacho'),
      'uf_saida': request.input('uf_saida'),
      'local_saida': request.input('local_saida'),
      'num_di': request.input('num_di'),
      'data_di': request.input('data_di'),
    };

    try {
      const result = await Nota.query().where('id', params.id).update(body);
      
      return result;
    } catch (error: any) {
      throw new Exception(error);
    }
  }

  public async delete({ request, response, params }: HttpContextContract) {
    const id_emissor = request.input('id_emissor');

    try {
      await Database.from('notas').delete().where('id', '=', params.id).andWhere('id_emissor', '=', id_emissor);
      response.status(201);
    } catch (error: any) {
      throw new Exception(error);
    }
  }
}
