# 🚗 Teste Técnico Info Tecnologia

Aplicação **CRUD completo de veículos** desenvolvida em **Angular** como parte de um teste técnico. Permite visualizar, cadastrar, editar e excluir veículos utilizando dados mockados.

## 📌 Sumário

- 📌 [Descrição](#descrição)
- ⚙️ [Tecnologias](#tecnologias)
- 🚀 [Funcionalidades](#funcionalidades)
- 🛠️ [Instalação](#instalação)
- ▶️ [Executar o Projeto](#executar-o-projeto)
- 🔍 [Estrutura do Projeto](#estrutura-do-projeto)

## 📌 Descrição

Este projeto foi gerado com **Angular CLI (versão 19.2.17)** e implementa um sistema básico de gerenciamento de veículos com funcionalidades de CRUD (criar, ler, atualizar e excluir).

Ideal para avaliação técnica ou como base para estudos em **Angular + TypeScript**.

## ⚙️ Tecnologias

O projeto utiliza as seguintes ferramentas:

- 🟦 **Angular CLI** – estrutura principal do front‑end
- 🔷 **TypeScript** – linguagem de programação principal
- 📄 **HTML / CSS** – marcação e estilos da interface
- ⚙️ Angular Services, Components e Routing para organização interna do app

## 🚀 Funcionalidades

✔️ Listagem de veículos
✔️ Detalhes de um veículo
✔️ Criação de novos veículos
✔️ Edição de veículos existentes
✔️ Exclusão de veículos
✔️ Dados mockados para facilitar testes e integração

## 🛠️ Instalação

Siga os passos abaixo para rodar o projeto localmente:

1. Clone o repositório:

   ```bash
   git clone https://github.com/RobertSGomes/teste-tecnico-info-tecnologia.git
   ```

2. Entre na pasta do projeto:

   ```bash
   cd teste-tecnico-info-tecnologia
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

## ▶️ Executar o Projeto

Para iniciar o servidor de desenvolvimento:

```bash
ng serve
```

Abra o navegador e acesse:

```
http://localhost:4200/
```

O Angular fará recarregamento automático ao salvar alterações no código.

## 🔍 Estrutura do Projeto

O projeto foi organizado em módulos e features, com componentes separados por responsabilidade. Entre os principais diretórios estão:

```
src/
├─ app/
│  ├─ core/                   # Services core da aplicação
│  ├─ features/vehicles/      # CRUD de veículos
│  ├─ shared/                 # Componentes, Constants, Helpers, Interfaces, Pipes e Types reutilizáveis
│  └─ layouts/                # Layouts
├─ assets/
└─ environments/
```
