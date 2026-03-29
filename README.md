# TypeDash 🚀

O **TypeDash** é uma plataforma moderna e minimalista para testes de velocidade e precisão de digitação. Inspirado em ferramentas como o MonkeyType, o projeto oferece uma interface fluida com o tema **Dracula**, permitindo que os usuários acompanhem seu progresso e compitam em um ranking global.

## ✨ Funcionalidades

- **Teste de Digitação:** Interface responsiva com cálculo progressivo de WPM e precisão.
- **Gráficos de Performance:** Visualização detalhada do desempenho durante o teste (via Recharts).
- **Dashboard Pessoal:** Histórico completo de testes realizados pelo usuário autenticado.
- **Ranking Global:** Tabela de classificação em tempo real com os melhores resultados da comunidade.
- **Autenticação:** Login seguro via GitHub utilizando Auth.js (NextAuth v5).
- **Tema Dracula:** Design premium e confortável para longas sessões de uso.

## 🛠️ Tecnologias Utilizadas

- **Core:** [Next.js 15](https://nextjs.org/) (App Router)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/) com [Prisma ORM](https://www.prisma.io/)
- **Autenticação:** [NextAuth.js v5 (Beta)](https://authjs.dev/)
- **Gráficos:** [Recharts](https://recharts.org/)
- **Validação:** [Zod](https://zod.dev/)

---

## 🚀 Como Começar

### Pré-requisitos

- Node.js (v20+)
- Uma instância de banco de dados PostgreSQL.

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/emanuelVINI01/typedash.git
   cd typedash
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto com os seguintes valores:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/typedash"
   AUTH_SECRET="seu-secret-aqui"
   AUTH_GITHUB_ID="seu-client-id"
   AUTH_GITHUB_SECRET="seu-client-secret"
   ```

4. Prepare o banco de dados:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

Acesse `http://localhost:3000` para ver o projeto em execução.

---

## 📡 Documentação da API

### 1. Palavras Aleatórias
Retorna uma lista de palavras para serem usadas no teste.

- **URL:** `/api/words`
- **Método:** `GET`
- **Resposta:** `string[]` (Array de 50 palavras aleatórias)

### 2. Salvar Métrica
Salva o resultado de um teste de digitação. Requer autenticação.

- **URL:** `/api/metrics`
- **Método:** `POST`
- **Corpo da Requisição:**
  ```json
  {
    "log": [
      { "key": "a", "time": 1711732000000, "expected": "a" },
      { "key": "b", "time": 1711732001000, "expected": "b" }
    ]
  }
  ```
- **Resposta de Sucesso:** `{ "success": true, "id": "cl..." }`
- **Erros:** `401 Unauthorized`, `400 Invalid format`.

### 3. Minhas Métricas
Retorna o histórico de testes do usuário conectado. Requer autenticação.

- **URL:** `/api/metrics/me`
- **Método:** `GET`
- **Parâmetros de Query:** `limit` (padrão: 10, máx: 100)
- **Resposta:** Lista de objetos contendo WPM, precisão, duração e data.

### 4. Ranking Global
Retorna os melhores resultados de todos os usuários.

- **URL:** `/api/metrics/ranking`
- **Método:** `GET`
- **Parâmetros de Query:** `limit` (padrão: 10, máx: 100)
- **Resposta:** Lista de métricas ordenadas por WPM (descendente).

---

## 📄 Licença

Este projeto está sob a licença [MIT](./LICENSE). Criado por [emanuelVINI](https://github.com/emanuelVINI01).
