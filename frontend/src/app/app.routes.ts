import { Routes } from '@angular/router';

import { Produtos } from './pages/produtos/produtos';
import { Clientes } from './pages/clientes/clientes';
import { Pedidos } from './pages/pedidos/pedidos';

export const routes: Routes = [
  {
    path: 'produtos',
    component: Produtos,
  },
  {
    path: 'clientes',
    component: Clientes,
  },
  {
    path: 'pedidos',
    component: Pedidos,
  },
];