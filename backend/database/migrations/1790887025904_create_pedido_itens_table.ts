import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'pedido_itens'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('pedido_id').unsigned().references('id').inTable('pedidos').onDelete('CASCADE')

      table
        .integer('produto_id')
        .unsigned()
        .references('id')
        .inTable('produtos')
        .onDelete('RESTRICT')

      table.integer('quantidade')
      table.decimal('preco_unitario', 10, 2)
      table.decimal('total_item', 10, 2)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
