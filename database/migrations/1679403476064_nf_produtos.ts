import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'nf_produtos';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().unique().notNullable();
      table.integer('id_nfe').unsigned().references('id').inTable('notas').onDelete('CASCADE').notNullable();
      table.integer('id_produto').unsigned().references('id').inTable('produtos').notNullable();
      table.string('descricao', 500).notNullable();
      table.string('info_adicional', 5000);
      table.string('ncm');
      table.string('un');
      table.string('cfop');
      table.string('cest');
      table.string('codbarras');
      table.double('quantidade').notNullable();
      table.double('valor_unitario').notNullable();
      table.double('valor_total').notNullable();
      table.double('desconto_p');
      table.double('desconto_total');
      table.double('p_reducao_base_icms');
      table.double('valor_icms');
      table.double('p_aliquota_credito');
      table.double('credito_icms_aproveitado');
      table.string('mod_det_bc_icms');
      table.string('mod_det_bc_icms_st');
      table.double('p_margem_vlr_adc_icms_st');
      table.double('p_reducao_base_icms_st');
      table.double('base_icms');
      table.double('base_icms_st');
      table.double('aliquota_icms_st');
      table.double('valor_icms_st');
      table.double('base_calc_retido_ant');
      table.double('icms_st_retido_ant');
      table.string('ean');
      table.string('pedido_compra');
      table.string('item');
      table.double('base_calc_ipi');
      table.double('valor_ipi');
      table.string('cnpj_produtor');
      table.double('base_calc_ii');
      table.double('desp_aduaneiras');
      table.double('valor_iof');
      table.double('valor_ii');
      table.double('base_calc_pis');
      table.double('valor_pis');
      table.double('base_calc_cofins');
      table.double('valor_cofins');
      table.double('ipi_p_devolvida');
      table.double('ipi_vlr_devolvido');
      table.double('fcp_base_calc');
      table.double('fcp_p');
      table.double('fcp_valor');
      table.double('fcp_base_calc_st');
      table.double('fcp_p_st');
      table.double('fcp_valor_st');
      table.double('partilha_icms_base_calc');
      table.double('partilha_icms_aliquota_fcp_uf_dest');
      table.double('partilha_icms_valor_fcp_uf_dest');
      table.double('partilha_icms_aliquota_interna_icms_uf_dest');
      table.double('partilha_icms_aliquota_icms_interestadual');
      table.string('partilha_icms_p_partilha');
      table.double('partilha_icms_valor_icms_uf_dest');
      table.double('partilha_icms_valor_icms_uf_ori');
      table.string('cst_icms');
      table.string('cst_ipi');
      table.string('cst_cofins');
      table.string('cst_pis');
      table.double('aliquota_icms');
      table.double('aliquota_ipi');
      table.double('aliquota_cofins');
      table.double('aliquota_pis');
      table.string('origem');
      table.string('cod_anp_comb');
      table.string('descricao_anp_comb');
      table.string('uf_consumo_comb');
      table.string('codif_comb');
      table.string('n_adicao_imp');
      table.string('seq_item_imp');
      table.string('fabricante_imp');
      table.string('registro_exp');
      table.string('chave_exp');
      table.string('qtde_exp');
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
