import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'notas';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().unique().notNullable();
      table.integer('id_emissor').unsigned().references('id').inTable('emissores').notNullable();
      table.integer('cod');
      table.string('tipo');
      table.integer('serie');
      table.string('natureza_operacao');
      table.string('cfop');
      table.string('forma_emissao');
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
      table.integer('base_calc_icms');
      table.integer('total_icms');
      table.integer('base_icms_st');
      table.integer('total_icms_st');
      table.integer('total_frete');
      table.integer('valor_seguro');
      table.integer('outras_despesas');
      table.integer('total_ii');
      table.integer('total_ipi');
      table.integer('total_pis');
      table.integer('total_cofins');
      table.integer('total_desconto_produtos');
      table.integer('total_desconto_servicos');
      table.integer('total_desconto_nf');
      table.integer('total_produtos');
      table.integer('total_nota');
      table.integer('base_calc_iss');
      table.integer('total_iss');
      table.integer('total_servicos');
      table.integer('aliquota_credito');
      table.integer('valor_credito');
      table.integer('retencao_pis');
      table.integer('retencao_cofins');
      table.integer('retencao_csll');
      table.integer('base_calc_irrf');
      table.integer('retencao_irrf');
      table.integer('base_prev_social');
      table.integer('ret_prov_social');
      table.integer('partilha_icms_dest');
      table.integer('partilha_icms_rem');
      table.integer('fcp_uf_dest');
      table.integer('total_ipi_devolvido');
      table.integer('total_fcp');
      table.integer('total_fcp_st');
      table.string('presenca_comprador');
      table.string('modalidade_frete');
      table.string('id_transportadora');
      table.string('quantidade_transporte');
      table.string('numero_transporte');
      table.string('especie_transporte');
      table.string('marca_transporte');
      table.string('peso_bruto');
      table.string('peso_liquido');
      table.string('info_adicionais');
      table.string('fonte_valor_aprox_tributos');
      table.string('nfe_referenciada');
      table.string('ecf_referenciado');
      table.string('n_coo');
      table.string('caminho_xml');
      table.string('chave_acesso');
      table.string('uf_embarque');
      table.string('local_embarque');
      table.string('local_despacho');
      table.string('uf_saida');
      table.string('local_saida');
      table.string('num_di');
      table.string('data_di');
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
