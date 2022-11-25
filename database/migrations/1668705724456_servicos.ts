import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'servicos';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().unique().notNullable();
      table.integer('id_emissor').unsigned().references('id').inTable('emissores').onDelete('CASCADE').notNullable();
      table.integer('nserv');
      table.string('descricao', 300);
      table.string('un', 3);
      table.double('preco');
      table.string('anotacoes', 5000);
      table.double('base_iss');
      table.double('aliquota_iss');
      table.string('status', 10);
      table.string('item_lista', 10);
      table.string('ncm', 10);
      table.string('situacao', 10);
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
