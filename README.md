#  Blog Fullstack

Projeto fullstack de um blog com autenticação de usuários e CRUD de posts, desenvolvido para prática de desenvolvimento web moderno e deploy em produção.

##  Demo

*  **Frontend:** https://SEU-FRONTEND.vercel.app
*  **Backend (API):** https://blog-5mz2.onrender.com
*  **Endpoint de teste:** https://blog-5mz2.onrender.com/posts

## Tecnologias utilizadas

### Frontend

* React
* Vite
* CSS

### Backend

* Node.js
* Express
* MySQL

### Deploy

* Vercel (Frontend)
* Render (Backend)
* Railway (Banco de Dados)

## Funcionalidades

* Cadastro de usuário (Register)
* Login com autenticação
* Criação de posts
* Listagem de posts
* Exclusão de posts
* Integração completa entre frontend e backend

## Aprendizados

Durante o desenvolvimento deste projeto, foram trabalhados conceitos como:

* Integração de API REST
* Autenticação com token
* Conexão com banco de dados na nuvem
* Deploy fullstack (frontend + backend + banco)
* Resolução de erros reais (CORS, conexão, ambiente)
* Uso de variáveis de ambiente (.env)

## Estrutura do projeto

```
blog/
│
├── frontend/
│   ├── src/
│   ├── components/
│   └── services/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── db/
│   └── server.js
```

## Como rodar localmente

### 🔹 Backend

```bash
cd backend
npm install
npm run dev
```

Crie um arquivo `.env`:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=senha
DB_NAME=blog
JWT_SECRET=segredo
```

---

### 🔹 Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🗄️ Banco de Dados

Tabelas utilizadas:

### users

* id
* name
* email
* password

### posts

* id
* title
* content
* userId
* createdAt

---

## Melhorias futuras

* Upload de imagens
* Sistema de comentários
* Melhor UI/UX
* Tratamento de erros mais avançado

---

## Autor

Desenvolvido por **Mlexandre Miguel**

## Observação

Este projeto representa um sistema fullstack completo com deploy em produção, simulando um cenário real de desenvolvimento.
