import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'nf_produtos';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().unique().notNullable();
      table.integer('id_nfe').unsigned().references('id').inTable('notas').onDelete('CASCADE').notNullable();
      table.integer('id_produto').unsigned().references('id').inTable('produtos').notNullable();
      table.string('descricao').notNullable();
      table.string('info_adicional').nullable();
      table.string('ncm').nullable();
      table.string('un').nullable();
      table.string('cfop').nullable();
      table.string('cest').nullable();
      table.integer('quantidade').notNullable();
      table.float('valor_unitario').notNullable();
      table.float('valor_total').notNullable();
      table.float('desconto_p').nullable();
      table.float('desconto_total').nullable();
      table.float('p_reducao_base_icms').nullable();
      table.float('valor_icms').nullable();
      table.float('p_aliquota_credito').nullable();
      table.float('credito_icms_aproveitado').nullable();
      table.string('mod_det_bc_icms').nullable();
      table.string('mod_det_bc_icms_st').nullable();
      table.float('p_margem_vlr_adc_icms_st').nullable();
      table.float('p_reducao_base_icms_st').nullable();
      table.float('base_icms_st').nullable();
      table.float('aliquota_icms_st').nullable();
      table.float('valor_icms_st').nullable();
      table.float('base_calc_retido_ant').nullable();
      table.float('icms_st_retido_ant').nullable();
      table.string('ean').nullable();
      table.string('pedido_compra').nullable();
      table.string('item').nullable();
      table.float('base_calc_ipi').nullable();
      table.float('valor_ipi').nullable();
      table.string('cnpj_produtor').nullable();
      table.float('base_calc_ii').nullable();
      table.float('desp_aduaneiras').nullable();
      table.float('valor_iof').nullable();
      table.float('valor_ii').nullable();
      table.float('base_calc_pis').nullable();
      table.float('valor_pis').nullable();
      table.float('base_calc_cofins').nullable();
      table.float('valor_cofins').nullable();
      table.float('ipi_p_devolvida').nullable();
      table.float('ipi_vlr_devolvido').nullable();
      table.float('fcp_base_calc').nullable();
      table.float('fcp_p').nullable();
      table.float('fcp_valor').nullable();
      table.float('fcp_base_calc_st').nullable();
      table.float('fcp_p_st').nullable();
      table.float('fcp_valor_st').nullable();
      table.float('partilha_icms_base_calc').nullable();
      table.float('partilha_icms_aliquota_fcp_uf_dest').nullable();
      table.float('partilha_icms_valor_fcp_uf_dest').nullable();
      table.float('partilha_icms_aliquota_interna_icms_uf_dest').nullable();
      table.float('partilha_icms_aliquota_icms_interestadual').nullable();
      table.string('partilha_icms_p_partilha').nullable();
      table.float('partilha_icms_valor_icms_uf_dest').nullable();
      table.float('partilha_icms_valor_icms_uf_ori').nullable();
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
