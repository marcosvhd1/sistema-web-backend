import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'emissores';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().unique().notNullable();
      table.integer('id_empresa');
      table.string('razao');
      table.string('fantasia');
      table.string('cnpjcpf');
      table.string('ie');
      table.string('im');
      table.string('endereco');
      table.string('numero');
      table.string('bairro');
      table.string('complemento');
      table.string('cnae');
      table.string('telefone');
      table.string('uf');
      table.string('cidade');
      table.string('cep');
      table.string('regime');
      table.string('cnpjcpf_principal');
      table.string('status');
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
