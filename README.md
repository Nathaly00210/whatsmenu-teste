# WhatsMenu — Sistema de Gerenciamento de Pedidos

Aplicação web desenvolvida como teste técnico para a WhatsMenu.

O projeto consiste em um sistema de gerenciamento de clientes, produtos e pedidos, permitindo cadastrar e editar clientes, gerenciar produtos e criar pedidos com controle de status.

## Sobre o projeto

A aplicação foi desenvolvida com frontend e backend separados:

- **Frontend:** Angular
- **Backend:** AdonisJS
- **Banco de dados:** SQLite
- **ORM:** Lucid ORM
- **Linguagem:** TypeScript

O backend é responsável pelas regras de negócio e pelo cálculo dos valores dos pedidos, enquanto o frontend fornece a interface para interação com o sistema.

## Funcionalidades

### Clientes

- Cadastro de clientes
- Listagem de clientes
- Edição de clientes

Cada cliente possui:
- Nome
- Telefone

### Produtos

- Cadastro de produtos
- Listagem de produtos
- Edição de produtos
- Ativação e desativação de produtos

Cada produto possui:
- Nome
- Preço
- Status (ativo/inativo)

### Pedidos

- Criação de pedidos
- Seleção do cliente
- Adição de produtos
- Definição de quantidade
- Remoção de produtos
- Cálculo do valor total
- Listagem dos pedidos
- Alteração do status
- Cancelamento de pedidos

## Regras de negócio

O sistema possui regras para garantir a consistência dos pedidos:

- Todo pedido deve possuir um cliente.
- Todo pedido deve possuir pelo menos um produto.
- A quantidade de cada produto deve ser no mínimo 1.
- Produtos inativos não podem ser adicionados a novos pedidos.
- O valor total do pedido é calculado pelo backend.
- O preço do produto é armazenado no item do pedido no momento da criação.
- Alterações futuras no preço do produto não modificam pedidos já realizados.
- Os status seguem o fluxo:
  `Pendente → Em preparação → Pronto → Finalizado`
- Um pedido pode ser cancelado.
- Um pedido cancelado não pode voltar para outro status.

## Estrutura do projeto

```text
whatsmenu-teste/
├── backend/
│   ├── app/
│   │   ├── controllers/
│   │   └── models/
│   ├── database/
│   │   └── migrations/
│   └── start/
│
├── frontend/
│   └── src/
│       └── app/
│           ├── pages/
│           │   ├── clientes/
│           │   ├── produtos/
│           │   └── pedidos/
│           └── services/
│
└── README.md

## Como executar

### Backend

```bash
cd backend
npm install
node ace migration:run
npm run dev

### Frontend

Em outro terminal:

```bash
cd frontend
npm install
ng serve