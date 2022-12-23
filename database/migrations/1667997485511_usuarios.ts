import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'usuarios';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().unique().notNullable();
      table.integer('id_empresa').unsigned().references('id').inTable('empresas').notNullable();
      table.string('email', 255).notNullable();
      table.string('password', 180).notNullable();
      table.string('usuario_principal', 3).notNullable();
      table.integer('tipo_admin').nullable();
      table.string('status', 8);
      table.integer('ultimo_emissor_selecionado').nullable();
      table.timestamp('created_at', { useTz: true }).notNullable();
      table.timestamp('updated_at', { useTz: true }).notNullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
