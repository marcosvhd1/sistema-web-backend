import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'nf_referenciadas';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().unique().notNullable();
      table.integer('id_nfe').unsigned().references('id').inTable('notas').onDelete('CASCADE').notNullable();
      table.string('descricao', 44);
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
