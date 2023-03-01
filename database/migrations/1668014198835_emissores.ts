import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'emissores';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().unique().notNullable();
      table.integer('id_empresa');
      table.string('razao', 255);
      table.string('fantasia', 255);
      table.string('cnpjcpf', 30);
      table.string('ie', 20);
      table.string('im', 20);
      table.string('endereco', 200);
      table.string('numero', 10);
      table.string('bairro', 50);
      table.string('complemento', 100);
      table.string('cnae', 20);
      table.string('telefone', 15);
      table.string('uf', 2);
      table.string('cidade', 100);
      table.string('cep', 20);
      table.string('regime', 50);
      table.string('cnpjcpf_principal', 30);
      table.string('status', 8);
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
