import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClientesService } from '../../services/clientes';

@Component({
  selector: 'app-clientes',
  imports: [FormsModule, CommonModule],
  templateUrl: './clientes.html',
  styleUrl: './clientes.css',
})
export class Clientes implements OnInit {

  clientes: any[] = [];

  nome = '';
  telefone = '';
  clienteEditando: number | null = null;

  constructor(
    private clientesService: ClientesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.carregarClientes();
  }

  carregarClientes() {
    this.clientesService.listar().subscribe({
      next: (dados: any) => {
        this.clientes = dados;
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar clientes:', erro);
      }
    });
  }

  salvarCliente(event: Event) {
    event.preventDefault();

    if (!this.nome || !this.telefone) {
      return;
    }

    if (this.clienteEditando !== null) {
      this.clientesService.editar(this.clienteEditando, {
        nome: this.nome,
        telefone: this.telefone
      }).subscribe({
        next: () => {
          this.limparFormulario();
          this.carregarClientes();
        },
        error: (erro) => {
          console.error('Erro ao editar cliente:', erro);
        }
      });

      return;
    }

    this.clientesService.criar({
      nome: this.nome,
      telefone: this.telefone
    }).subscribe({
      next: () => {
        this.limparFormulario();
        this.carregarClientes();
      },
      error: (erro) => {
        console.error('Erro ao criar cliente:', erro);
      }
    });
  }

  editarCliente(cliente: any) {
    this.clienteEditando = cliente.id;
    this.nome = cliente.nome;
    this.telefone = cliente.telefone;
  }

  limparFormulario() {
    this.nome = '';
    this.telefone = '';
    this.clienteEditando = null;
  }
}