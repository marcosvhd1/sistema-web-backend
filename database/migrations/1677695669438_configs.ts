import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'configs';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().unique().notNullable();
      table.integer('id_emissor').unsigned().references('id').inTable('emissores').notNullable();
      table.text('cert_base64');
      table.string('ambiente');
      table.string('tipo_imp');
      table.string('forma_emi');
      table.string('finalidade');
      table.string('justif', 5000);
      table.string('id_nfce');
      table.string('token_nfce');
      table.string('serie_padrao');
      table.string('aliq_aprov_icms');
      table.string('email_remetente');
      table.string('email');
      table.string('host');
      table.string('usuario');
      table.string('senha');
      table.string('porta');
      table.string('copia');
      table.string('assunto');
      table.string('mensagem');
      table.boolean('autenticacao');
      table.boolean('ssl');
      table.boolean('tls');
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
