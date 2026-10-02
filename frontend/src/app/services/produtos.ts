import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProdutosService {
  private apiUrl = 'http://localhost:3333/api/v1/produtos';

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get(this.apiUrl);
  }

  criar(produto: { nome: string; preco: number }) {
    return this.http.post(this.apiUrl, produto);
  }

  editar(id: number, produto: { nome: string; preco: number }) {
    return this.http.put(`${this.apiUrl}/${id}`, produto);
  }

  alterarStatus(id: number, ativo: boolean) {
    return this.http.patch(`${this.apiUrl}/${id}/status`, { ativo });
  }
}
