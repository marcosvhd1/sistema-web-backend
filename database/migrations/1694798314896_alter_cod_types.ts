import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  public async up () {
    this.schema.alterTable('clientes', (table) => {
      table.string('cod').alter();
    });
    this.schema.alterTable('transportadoras', (table) => {
      table.string('cod').alter();
    });
  }

  public async down () {
    this.schema.alterTable('clientes', (table) => {
      table.integer('cod').alter();
    });
    this.schema.alterTable('transportadoras', (table) => {
      table.integer('cod').alter();
    });
  }
}