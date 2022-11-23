import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'produtos';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().unique().notNullable();
      table.integer('id_emissor').unsigned().references('id').inTable('emissors').onDelete('CASCADE').notNullable();
      table.integer('nprod');
      table.string('descricao', 300);
      table.string('referencia', 30);
      table.string('codbarras', 30);
      table.string('marca', 100);
      table.string('grupo', 50);
      table.double('preco');
      table.double('preco_trib');
      table.string('un', 3);
      table.string('un_trib', 3);
      table.string('status', 10);
      table.string('anotacoes', 5000);
      table.string('cst_icms', 5);
      table.double('aliquota_icms');
      table.double('base_icms');
      table.string('cst_ipi', 5);
      table.double('aliquota_ipi');
      table.string('cst_cofins', 5);
      table.double('aliquota_cofins');
      table.string('cst_pis', 5);
      table.double('aliquota_pis');
      table.string('info_adicional', 500);
      table.string('ncm', 10);
      table.string('cest', 10);
      table.string('cnpj_produtor', 20);
      table.string('producao_propria', 3);
      table.string('cfop', 4);
      table.string('origem', 1000);
      table.double('peso_bruto');
      table.double('peso_liquido');
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
