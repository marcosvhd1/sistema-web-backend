import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'cfops';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().unique().notNullable();
      table.integer('id_emissor').unsigned().references('id').inTable('emissores').notNullable();
      table.string('cfop_dentro');
      table.string('cfop_fora');
      table.string('natureza', 300);
      table.string('info', 5000);
      table.boolean('calc_icms');
      table.boolean('calc_icms_st');
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
