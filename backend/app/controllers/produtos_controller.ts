import type { HttpContext } from '@adonisjs/core/http'

import Produto from '#models/produto'

export default class ProdutosController {
  async store({ request, response }: HttpContext) {
    const dados = request.only(['nome', 'preco'])

    const produto = await Produto.create(dados)

    return response.created(produto)
  }

  async index() {
    const produtos = await Produto.all()

    return produtos
  }

  async update({ params, request, response }: HttpContext) {
    const produto = await Produto.findOrFail(params.id)

    const dados = request.only(['nome', 'preco'])

    produto.merge(dados)
    await produto.save()

    return response.ok(produto)
  }

  async updateStatus({ params, request, response }: HttpContext) {
    const produto = await Produto.findOrFail(params.id)

    const { ativo } = request.only(['ativo'])

    produto.ativo = ativo
    await produto.save()

    return response.ok(produto)
  }
}
