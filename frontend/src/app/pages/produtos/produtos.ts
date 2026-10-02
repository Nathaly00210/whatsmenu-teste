import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProdutosService } from '../../services/produtos';

@Component({
  selector: 'app-produtos',
  imports: [FormsModule, CommonModule],
  templateUrl: './produtos.html',
  styleUrl: './produtos.css',
})
export class Produtos implements OnInit {

  produtos: any[] = [];

  nome = '';
  preco: number | null = null;
  produtoEditando: number | null = null;

  constructor(
    private produtosService: ProdutosService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.produtosService.listar().subscribe({
      next: (dados: any) => {
        this.produtos = dados;
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar produtos:', erro);
      }
    });
  }

  criarProduto(event: Event) {
    event.preventDefault();

    if (!this.nome || this.preco === null) {
      return;
    }

    if (this.produtoEditando !== null) {
      this.produtosService.editar(this.produtoEditando, {
        nome: this.nome,
        preco: this.preco
      }).subscribe({
        next: () => {
          this.nome = '';
          this.preco = null;
          this.produtoEditando = null;
          this.carregarProdutos();
        },
        error: (erro) => {
          console.error('Erro ao editar produto:', erro);
        }
      });

      return;
    }

    this.produtosService.criar({
      nome: this.nome,
      preco: this.preco
    }).subscribe({
      next: () => {
        this.nome = '';
        this.preco = null;
        this.carregarProdutos();
      },
      error: (erro) => {
        console.error('Erro ao criar produto:', erro);
      }
    });
  }

  editarProduto(produto: any) {
    this.produtoEditando = produto.id;
    this.nome = produto.nome;
    this.preco = produto.preco;
  }

  alterarStatus(produto: any) {
    this.produtosService.alterarStatus(produto.id, !produto.ativo).subscribe({
      next: () => {
        this.carregarProdutos();
      },
      error: (erro) => {
        console.error('Erro ao alterar status:', erro);
      }
    });
  }
}