import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'configs'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('serie_padrao_nfce');
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}