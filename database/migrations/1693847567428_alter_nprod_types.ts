import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'produtos'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('nprod').alter();
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}