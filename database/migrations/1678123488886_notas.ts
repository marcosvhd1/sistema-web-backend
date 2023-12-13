import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'notas';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().unique().notNullable();
      table.integer('id_emissor').unsigned().references('id').inTable('emissores').notNullable();
      table.string('cod');
      table.string('tipo');
      table.integer('serie');
      table.string('natureza_operacao', 300);
      table.string('cfop');
      table.string('finalidade');
      table.string('status');
      table.integer('modelo');
      table.string('consumidor_final');
      table.string('id_destinatario');
      table.string('nome_destinatario');
      table.string('data_emissao');
      table.string('data_saida');
      table.string('hora');
      table.string('competencia');
      table.double('base_calc_icms');
      table.double('total_icms');
      table.double('base_icms_st');
      table.double('total_icms_st');
      table.double('total_frete');
      table.double('valor_seguro');
      table.double('outras_despesas');
      table.double('total_ii');
      table.double('total_ipi');
      table.double('total_pis');
      table.double('total_cofins');
      table.double('total_desconto_produtos');
      table.double('total_desconto_servicos');
      table.double('total_desconto_nf');
      table.double('total_produtos');
      table.double('total_nota');
      table.double('base_calc_iss');
      table.double('total_iss');
      table.double('total_servicos');
      table.double('aliquota_credito');
      table.double('valor_credito');
      table.double('retencao_pis');
      table.double('retencao_cofins');
      table.double('retencao_csll');
      table.double('base_calc_irrf');
      table.double('retencao_irrf');
      table.double('base_prev_social');
      table.double('ret_prov_social');
      table.double('partilha_icms_dest');
      table.double('partilha_icms_rem');
      table.double('fcp_uf_dest');
      table.double('total_ipi_devolvido');
      table.double('total_fcp');
      table.double('total_fcp_st');
      table.string('presenca_comprador');
      table.string('modalidade_frete');
      table.string('id_transportadora');
      table.string('quantidade_transporte');
      table.string('numero_transporte');
      table.string('especie_transporte');
      table.string('marca_transporte');
      table.string('peso_bruto');
      table.string('peso_liquido');
      table.string('info_adicionais', 5000);
      table.string('fonte_valor_aprox_tributos');
      table.string('ecf_referenciado');
      table.string('n_coo');
      table.string('caminho_xml', 5000);
      table.string('caminho_pdf', 5000);
      table.string('caminho_pdf_cce', 5000);
      table.string('chave_acesso');
      table.string('protocolo');
      table.string('uf_embarque');
      table.string('local_embarque');
      table.string('local_despacho');
      table.string('uf_saida');
      table.string('local_saida');
      table.string('num_di');
      table.string('data_di');
      table.string('transporte');
      table.string('uf_desembaraco');
      table.string('local_desembaraco');
      table.string('data_desembaraco');
      table.string('ind_intermed');
      table.string('cnpj_intermed');
      table.string('id_intermed');
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
