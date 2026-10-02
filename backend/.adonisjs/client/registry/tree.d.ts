/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    newAccount: {
      store: typeof routes['auth.new_account.store']
    }
    accessTokens: {
      store: typeof routes['auth.access_tokens.store']
    }
  }
  profile: {
    profile: {
      show: typeof routes['profile.profile.show']
    }
    accessTokens: {
      destroy: typeof routes['profile.access_tokens.destroy']
    }
  }
  clientes: {
    store: typeof routes['clientes.store']
    index: typeof routes['clientes.index']
    update: typeof routes['clientes.update']
  }
  produtos: {
    store: typeof routes['produtos.store']
    index: typeof routes['produtos.index']
    update: typeof routes['produtos.update']
    updateStatus: typeof routes['produtos.update_status']
  }
  pedidos: {
    store: typeof routes['pedidos.store']
    index: typeof routes['pedidos.index']
    updateStatus: typeof routes['pedidos.update_status']
  }
}
