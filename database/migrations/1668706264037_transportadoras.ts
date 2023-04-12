import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'transportadoras';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().unique().notNullable();
      table.integer('id_emissor').unsigned().references('id').inTable('emissores').notNullable();
      table.integer('cod').notNullable();
      table.string('razao').notNullable();
      table.string('fantasia');
      table.string('cnpjcpf');
      table.string('ie');
      table.string('rntrc');
      table.string('logradouro');
      table.string('numero');
      table.string('bairro');
      table.string('cep');
      table.string('uf');
      table.string('cidade');
      table.integer('id_cidade');
      table.string('complemento');
      table.string('tipo_telefone1');
      table.string('tipo_telefone2');
      table.string('telefone1');
      table.string('telefone2');
      table.string('anotacoes', 5000);
      table.string('placa');
      table.string('uf_placa');
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
