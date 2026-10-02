import type { HttpContext } from '@adonisjs/core/http'

import Cliente from '#models/cliente'
import Pedido from '#models/pedido'
import PedidoItem from '#models/pedido_item'
import Produto from '#models/produto'

export default class PedidosController {
  async store({ request, response }: HttpContext) {
    const dados = request.only(['cliente_id', 'itens'])

    const cliente = await Cliente.findOrFail(dados.cliente_id)

    if (!dados.itens || dados.itens.length === 0) {
      return response.badRequest({
        message: 'O pedido deve ter pelo menos um produto.',
      })
    }

    const produtos = await Produto.all()

    let valorTotal = 0

    for (const item of dados.itens) {
      if (item.quantidade < 1) {
        return response.badRequest({
          message: 'A quantidade do produto deve ser no mínimo 1.',
        })
      }

      const produto = produtos.find((itemProduto) => itemProduto.id === item.produto_id)
      if (!produto) {
        return response.badRequest({
          message: 'Produto não encontrado.',
        })
      }

      if (!produto.ativo) {
        return response.badRequest({
          message: 'Produto inativo não pode ser adicionado ao pedido.',
        })
      }

      const precoUnitario = Number(produto.preco)
      const totalItem = precoUnitario * item.quantidade

      valorTotal += totalItem
    }

    const pedido = await Pedido.create({
      clienteId: cliente.id,
      status: 'Pendente',
      valorTotal,
    })

    for (const item of dados.itens) {
      const produto = produtos.find((itemProduto) => itemProduto.id === item.produto_id)

      const precoUnitario = Number(produto!.preco)
      const totalItem = precoUnitario * item.quantidade

      await PedidoItem.create({
        pedidoId: pedido.id,
        produtoId: produto!.id,
        quantidade: item.quantidade,
        precoUnitario,
        totalItem,
      })
    }

    return response.created(pedido)
  }

  async index() {
    const pedidos = await Pedido.query().preload('cliente').preload('itens')

    return pedidos
  }

  async updateStatus({ params, request, response }: HttpContext) {
    const pedido = await Pedido.findOrFail(params.id)

    const { status } = request.only(['status'])

    const statusPermitidos = ['Pendente', 'Em preparação', 'Pronto', 'Finalizado', 'Cancelado']

    if (!statusPermitidos.includes(status)) {
      return response.badRequest({
        message: 'Status inválido.',
      })
    }

    if (pedido.status === 'Cancelado') {
      return response.badRequest({
        message: 'Pedido cancelado não pode ter o status alterado.',
      })
    }

    const proximosStatus: Record<string, string> = {
      'Pendente': 'Em preparação',
      'Em preparação': 'Pronto',
      'Pronto': 'Finalizado',
    }

    if (status !== 'Cancelado' && proximosStatus[String(pedido.status)] !== status) {
      return response.badRequest({
        message: `Não é possível alterar de ${pedido.status} para ${status}.`,
      })
    }

    pedido.status = status
    await pedido.save()

    return response.ok(pedido)
  }
}
