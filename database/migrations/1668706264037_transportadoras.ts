import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'transportadoras';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().unique().notNullable();
      table.integer('id_emissor').unsigned().references('id').inTable('emissors').onDelete('CASCADE').notNullable();
      table.integer('cod').notNullable();
      table.string('razao', 100).notNullable();
      table.string('fantasia', 100);
      table.string('cnpjcpf', 30);
      table.string('ie', 20);
      table.string('rntrc', 100);
      table.string('logradouro', 255);
      table.string('numero', 20);
      table.string('bairro', 100);
      table.string('cep', 20);
      table.string('uf', 2);
      table.string('cidade', 50);
      table.integer('id_cidade');
      table.string('complemento', 255);
      table.string('tipo_telefone1', 15);
      table.string('tipo_telefone2', 15);
      table.string('telefone1', 15);
      table.string('telefone2', 15);
      table.string('anotacoes', 5000);
      table.string('placa', 15);
      table.string('uf_placa', 2);
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
