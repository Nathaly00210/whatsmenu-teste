import type { HttpContext } from '@adonisjs/core/http'

import Cliente from '#models/cliente'

export default class ClientesController {
  async store({ request, response }: HttpContext) {
    const dados = request.only(['nome', 'telefone'])

    const cliente = await Cliente.create(dados)

    return response.created(cliente)
  }

  async index() {
    const clientes = await Cliente.all()

    return clientes
  }

  async update({ params, request, response }: HttpContext) {
    const cliente = await Cliente.findOrFail(params.id)

    const dados = request.only(['nome', 'telefone'])

    cliente.merge(dados)
    await cliente.save()

    return response.ok(cliente)
  }
}
