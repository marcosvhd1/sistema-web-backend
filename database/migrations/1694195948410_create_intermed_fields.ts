import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'notas'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('ind_intermed');
      table.string('cnpj_intermed');
      table.string('id_intermed');
    });
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('ind_intermed');
      table.dropColumn('cnpj_intermed');
      table.dropColumn('id_intermed');
    });
  }
}