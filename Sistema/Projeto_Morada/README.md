# Morada Igreja Batista - Site Institucional

Este é um site institucional para a Morada Igreja Batista, desenvolvido com React e Node.js.

## Tecnologias Utilizadas

- React
- React Router DOM
- Tailwind CSS
- Node.js
- Vite

## Estrutura do Projeto

O projeto está organizado da seguinte forma:

- `/src` - Código-fonte principal
  - `/components` - Componentes reutilizáveis
  - `/context` - Contextos React para gerenciamento de estado
  - `/data` - Arquivos JSON com dados da aplicação
  - `/pages` - Páginas da aplicação
    - `/admin` - Páginas administrativas
  - `/types` - Definições de tipos TypeScript

## Funcionalidades

### Área Pública
- Página inicial com informações sobre a igreja, eventos próximos e devocional do dia
- Página de eventos com listagem e filtros
- Página de cultos com calendário mensal
- Página de devocionais diários
- Página de contato com formulário

### Área Administrativa
- Painel administrativo protegido por login
- Gerenciamento de eventos (adicionar, editar, excluir)
- Gerenciamento de cultos (adicionar, editar, excluir)
- Gerenciamento de devocionais (adicionar, editar)

## Como Executar o Projeto

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório
```
git clone https://github.com/seu-usuario/morada-igreja-batista.git
```

2. Instale as dependências
```
cd morada-igreja-batista
npm install
```

3. Execute o projeto
```
npm run dev
```

### Acessando o Painel Administrativo

- URL: `/admin/login`
- Usuário: `admin`
- Senha: `igreja123`

## Personalização

Os principais elementos que podem ser personalizados incluem:

- Cores: Modificar variáveis no arquivo `src/index.css`
- Dados: Atualizar os arquivos JSON em `src/data/`
- Imagens: Substituir URLs das imagens no código