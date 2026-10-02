import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

import Cliente from '#models/cliente'
import PedidoItem from '#models/pedido_item'
import { PedidoSchema } from '#database/schema'

export default class Pedido extends PedidoSchema {
  @belongsTo(() => Cliente)
  declare cliente: BelongsTo<typeof Cliente>

  @hasMany(() => PedidoItem)
  declare itens: HasMany<typeof PedidoItem>
}
