# Fullstack App – React + Express + MongoDB

Este projeto é uma aplicação fullstack unificada para deploy no [Render](https://render.com), com:

- 📦 Frontend em React + Vite (`/client`)
- ⚙️ Backend em Express com TypeScript (`/server`)
- ☁️ MongoDB Atlas como banco de dados

---

## 🚀 Como fazer deploy no Render

### 1. Suba o projeto para o GitHub

Crie um novo repositório e envie o conteúdo deste projeto para lá.

### 2. Configure o serviço no Render

1. Acesse [https://render.com](https://render.com)
2. Clique em **"New Web Service"**
3. Conecte seu repositório do GitHub
4. Configure:
   - **Build Command:** `npm run build`
   - **Start Command:** `npm start`
   - **Environment:** `Node`
   - **Root Directory:** *(deixe em branco)*

### 3. Defina as variáveis de ambiente

No painel do serviço no Render, clique em **Environment** e adicione:

| Nome       | Valor                          |
|------------|--------------------------------|
| `MONGO_URI` | URL do seu banco MongoDB Atlas |

---

## 💻 Rodando localmente

```bash
npm run build
npm start
```

O frontend React será servido pelo Express na mesma porta (`http://localhost:3000`).

---

## 📁 Estrutura de pastas

```
/client   → aplicação React (frontend)
/server   → API Node/Express com TypeScript (backend)
```

---

## 📝 Observações

- O backend serve o build do React automaticamente.
- O MongoDB não está incluído neste repositório, use [MongoDB Atlas](https://www.mongodb.com/atlas/database) para criar um cluster gratuito.

---
