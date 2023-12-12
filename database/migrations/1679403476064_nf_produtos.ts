import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'nf_produtos';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().unique().notNullable();
      table.integer('id_nfe').unsigned().references('id').inTable('notas').onDelete('CASCADE').notNullable();
      table.integer('id_produto').unsigned().references('id').inTable('produtos').notNullable();
      table.string('descricao', 500).notNullable();
      table.string('info_adicional', 5000).nullable();
      table.string('ncm').nullable();
      table.string('un').nullable();
      table.string('cfop').nullable();
      table.string('cest').nullable();
      table.string('codbarras').nullable();
      table.double('quantidade').notNullable();
      table.double('valor_unitario').notNullable();
      table.double('valor_total').notNullable();
      table.double('desconto_p').nullable();
      table.double('desconto_total').nullable();
      table.double('p_reducao_base_icms').nullable();
      table.double('valor_icms').nullable();
      table.double('p_aliquota_credito').nullable();
      table.double('credito_icms_aproveitado').nullable();
      table.string('mod_det_bc_icms').nullable();
      table.string('mod_det_bc_icms_st').nullable();
      table.double('p_margem_vlr_adc_icms_st').nullable();
      table.double('p_reducao_base_icms_st').nullable();
      table.double('base_icms').nullable();
      table.double('base_icms_st').nullable();
      table.double('aliquota_icms_st').nullable();
      table.double('valor_icms_st').nullable();
      table.double('base_calc_retido_ant').nullable();
      table.double('icms_st_retido_ant').nullable();
      table.string('ean').nullable();
      table.string('pedido_compra').nullable();
      table.string('item').nullable();
      table.double('base_calc_ipi').nullable();
      table.double('valor_ipi').nullable();
      table.string('cnpj_produtor').nullable();
      table.double('base_calc_ii').nullable();
      table.double('desp_aduaneiras').nullable();
      table.double('valor_iof').nullable();
      table.double('valor_ii').nullable();
      table.double('base_calc_pis').nullable();
      table.double('valor_pis').nullable();
      table.double('base_calc_cofins').nullable();
      table.double('valor_cofins').nullable();
      table.double('ipi_p_devolvida').nullable();
      table.double('ipi_vlr_devolvido').nullable();
      table.double('fcp_base_calc').nullable();
      table.double('fcp_p').nullable();
      table.double('fcp_valor').nullable();
      table.double('fcp_base_calc_st').nullable();
      table.double('fcp_p_st').nullable();
      table.double('fcp_valor_st').nullable();
      table.double('partilha_icms_base_calc').nullable();
      table.double('partilha_icms_aliquota_fcp_uf_dest').nullable();
      table.double('partilha_icms_valor_fcp_uf_dest').nullable();
      table.double('partilha_icms_aliquota_interna_icms_uf_dest').nullable();
      table.double('partilha_icms_aliquota_icms_interestadual').nullable();
      table.string('partilha_icms_p_partilha').nullable();
      table.double('partilha_icms_valor_icms_uf_dest').nullable();
      table.double('partilha_icms_valor_icms_uf_ori').nullable();
      table.string('cst_icms');
      table.string('cst_ipi');
      table.string('cst_cofins');
      table.string('cst_pis');
      table.double('aliquota_icms');
      table.double('aliquota_ipi');
      table.double('aliquota_cofins');
      table.double('aliquota_pis');
      table.string('origem');
      table.string('cod_anp').nullable();
      table.string('descricao_anp').nullable();
      table.string('uf_consumo').nullable();
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
