import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'clientes';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().unique().notNullable();
      table.integer('id_emissor').unsigned().references('id').inTable('emissores').notNullable();
      table.string('cod');
      table.string('tipo');
      table.string('categoria');
      table.string('razao');
      table.string('fantasia');
      table.string('cnpjcpf');
      table.string('rg');
      table.string('datanasc');
      table.string('ie');
      table.string('im');
      table.string('suframa');
      table.string('tipo_contribuinte');
      table.string('logradouro');
      table.string('numero');
      table.string('bairro');
      table.string('cep');
      table.string('uf');
      table.string('cidade');
      table.integer('id_cidade');
      table.string('complemento');
      table.string('observacao', 5000);
      table.string('tipo_telefone1');
      table.string('tipo_telefone2');
      table.string('tipo_telefone3');
      table.string('telefone1');
      table.string('telefone2');
      table.string('telefone3');
      table.string('pais');
      table.string('cod_pais');
      table.string('email1');
      table.string('email2');
      table.string('site');
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
