import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'produtos';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().unique().notNullable();
      table.integer('id_emissor').unsigned().references('id').inTable('emissores').notNullable();
      table.integer('nprod');
      table.string('descricao', 500);
      table.string('referencia');
      table.string('codbarras');
      table.string('marca');
      table.string('grupo');
      table.double('preco');
      table.double('preco_trib');
      table.string('un');
      table.string('un_trib');
      table.string('status');
      table.string('anotacoes', 5000);
      table.string('cst_icms');
      table.double('aliquota_icms');
      table.double('base_icms');
      table.string('cst_ipi');
      table.double('aliquota_ipi');
      table.string('cst_cofins');
      table.double('aliquota_cofins');
      table.string('cst_pis');
      table.double('aliquota_pis');
      table.string('info_adicional');
      table.string('ncm');
      table.string('cest');
      table.string('cnpj_produtor');
      table.string('producao_propria');
      table.string('cfop');
      table.string('origem');
      table.double('peso_bruto');
      table.double('peso_liquido');
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
