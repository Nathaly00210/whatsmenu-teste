import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  private apiUrl = 'http://localhost:3333/api/v1/clientes';

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get(this.apiUrl);
  }

  criar(cliente: { nome: string; telefone: string }) {
    return this.http.post(this.apiUrl, cliente);
  }

  editar(id: number, cliente: { nome: string; telefone: string }) {
    return this.http.put(`${this.apiUrl}/${id}`, cliente);
  }
}