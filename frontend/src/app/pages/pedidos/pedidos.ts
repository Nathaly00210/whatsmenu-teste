import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PedidosService } from '../../services/pedidos';
import { ClientesService } from '../../services/clientes';
import { ProdutosService } from '../../services/produtos';

@Component({
  selector: 'app-pedidos',
  imports: [FormsModule, CommonModule],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css',
})
export class Pedidos implements OnInit {

  pedidos: any[] = [];
  clientes: any[] = [];
  produtos: any[] = [];

  clienteSelecionado: number | null = null;
  produtoSelecionado: number | null = null;
  quantidade = 1;

  itens: any[] = [];

  constructor(
    private pedidosService: PedidosService,
    private clientesService: ClientesService,
    private produtosService: ProdutosService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    this.pedidosService.listar().subscribe({
      next: (dados: any) => {
        this.pedidos = dados;
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar pedidos:', erro);
      }
    });

    this.clientesService.listar().subscribe({
      next: (dados: any) => {
        this.clientes = dados;
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar clientes:', erro);
      }
    });

    this.produtosService.listar().subscribe({
      next: (dados: any) => {
        this.produtos = dados.filter((produto: any) => produto.ativo);
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar produtos:', erro);
      }
    });
  }

  adicionarProduto() {
    if (this.produtoSelecionado === null || this.quantidade < 1) {
      return;
    }

    const produto = this.produtos.find(
      (item) => item.id === Number(this.produtoSelecionado)
    );

    if (!produto) {
      return;
    }

    const itemExistente = this.itens.find(
      (item) => item.produto_id === produto.id
    );

    if (itemExistente) {
      itemExistente.quantidade += this.quantidade;
      itemExistente.total = itemExistente.quantidade * produto.preco;
    } else {
      this.itens.push({
        produto_id: produto.id,
        nome: produto.nome,
        preco: Number(produto.preco),
        quantidade: this.quantidade,
        total: Number(produto.preco) * this.quantidade
      });
    }

    this.produtoSelecionado = null;
    this.quantidade = 1;
  }

  removerProduto(index: number) {
    this.itens.splice(index, 1);
  }

  calcularTotal() {
    return this.itens.reduce(
      (total, item) => total + item.total,
      0
    );
  }

  criarPedido(event: Event) {
    event.preventDefault();

    if (
      this.clienteSelecionado === null ||
      this.itens.length === 0
    ) {
      return;
    }

    const pedido = {
      cliente_id: Number(this.clienteSelecionado),
      itens: this.itens.map((item) => ({
        produto_id: item.produto_id,
        quantidade: item.quantidade
      }))
    };

    this.pedidosService.criar(pedido).subscribe({
      next: () => {
        this.itens = [];
        this.clienteSelecionado = null;
        this.carregarDados();
      },
      error: (erro) => {
        console.error('Erro ao criar pedido:', erro);
      }
    });
  }

  alterarStatus(pedido: any, status: string) {
    this.pedidosService.alterarStatus(pedido.id, status).subscribe({
      next: () => {
        this.carregarDados();
      },
      error: (erro) => {
        console.error('Erro ao alterar status:', erro);
      }
    });
  }
}
