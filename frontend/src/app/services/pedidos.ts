import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PedidosService {
  private apiUrl = 'http://localhost:3333/api/v1/pedidos';

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get(this.apiUrl);
  }

  criar(pedido: {
    cliente_id: number;
    itens: {
      produto_id: number;
      quantidade: number;
    }[];
  }) {
    return this.http.post(this.apiUrl, pedido);
  }

  alterarStatus(id: number, status: string) {
    return this.http.patch(`${this.apiUrl}/${id}/status`, { status });
  }
}
