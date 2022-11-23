import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'emissores';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().unique().notNullable();
      table.integer('id_empresa');
      table.string('razao', 255);
      table.string('cnpjcpf', 30);
      table.string('cnpjcpf_principal', 30);
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
