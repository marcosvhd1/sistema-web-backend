import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'cidades';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().unique().notNullable();
      table.string('nome').notNullable();
      table.string('uf').notNullable();
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
