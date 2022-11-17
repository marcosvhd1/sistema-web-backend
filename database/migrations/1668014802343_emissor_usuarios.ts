import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'emissor_usuarios';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().unique().notNullable();
      table.integer('id_usuario').unsigned().references('id').inTable('usuarios').onDelete('CASCADE').notNullable();
      table.integer('id_emissor').unsigned().references('id').inTable('emissores').onDelete('CASCADE').notNullable();
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
