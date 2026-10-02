/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'

router.get('/', () => {
  return { hello: 'world' }
})

router
  .group(() => {
    router
      .group(() => {
        router.post('signup', [controllers.NewAccount, 'store'])
        router.post('login', [controllers.AccessTokens, 'store'])
      })
      .prefix('auth')
      .as('auth')

    router
      .group(() => {
        router.get('profile', [controllers.Profile, 'show'])
        router.post('logout', [controllers.AccessTokens, 'destroy'])
      })
      .prefix('account')
      .as('profile')
      .use(middleware.auth())

    router.post('clientes', [() => import('#controllers/clientes_controller'), 'store'])
    router.get('clientes', [() => import('#controllers/clientes_controller'), 'index'])
    router.put('clientes/:id', [() => import('#controllers/clientes_controller'), 'update'])

    router.post('produtos', [() => import('#controllers/produtos_controller'), 'store'])
    router.get('produtos', [() => import('#controllers/produtos_controller'), 'index'])
    router.put('produtos/:id', [() => import('#controllers/produtos_controller'), 'update'])
    router.patch('produtos/:id/status', [
      () => import('#controllers/produtos_controller'),
      'updateStatus',
    ])

    router.post('pedidos', [() => import('#controllers/pedidos_controller'), 'store'])

    router.get('pedidos', [() => import('#controllers/pedidos_controller'), 'index'])

    router.patch('pedidos/:id/status', [
      () => import('#controllers/pedidos_controller'),
      'updateStatus',
    ])
  })
  .prefix('/api/v1')
