# Morada Igreja Batista - Backend

Backend do site da Morada Igreja Batista, desenvolvido com Node.js, Express, Prisma e MySQL.

## Requisitos

- Node.js 18 ou superior
- MySQL 8.0 ou superior
- npm ou yarn

## Configuração

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Copie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Configure o banco de dados MySQL e atualize a URL de conexão no arquivo `.env`

5. Execute as migrações do Prisma:
```bash
npm run prisma:migrate
```

6. Gere o cliente Prisma:
```bash
npm run prisma:generate
```

## Executando o Projeto

Desenvolvimento:
```bash
npm run dev
```

Produção:
```bash
npm start
```

## Estrutura do Projeto

```
src/
  ├── controllers/     # Controladores da aplicação
  ├── middlewares/    # Middlewares Express
  ├── routes/         # Rotas da API
  ├── services/       # Serviços da aplicação
  ├── validators/     # Validadores de entrada
  └── server.js       # Ponto de entrada da aplicação
```

## Rotas da API

### Autenticação
- POST /api/auth/login
- POST /api/auth/forgot-password
- POST /api/auth/reset-password

### Eventos
- GET /api/events
- POST /api/events
- PUT /api/events/:id
- DELETE /api/events/:id

### Devocionais
- GET /api/devotionals
- POST /api/devotionals
- PUT /api/devotionals/:id
- DELETE /api/devotionals/:id

### Usuários
- GET /api/users
- POST /api/users
- PUT /api/users/:id
- DELETE /api/users/:id

## Segurança

- Autenticação via JWT
- Senhas criptografadas com bcrypt
- Proteção contra ataques comuns (CORS, Helmet)
- Rate limiting para prevenir abusos
- Validação de entrada com Joi