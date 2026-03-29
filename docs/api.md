# API Documentation - Typing Metrics

Esta documentação descreve os endpoints disponíveis na API do Typing Metrics.

---

## 1. Palavras (Words)

### `GET /api/words`
Retorna uma lista de palavras aleatórias para o teste de digitação.

- **Autenticação:** Não necessária (Público).
- **Parâmetros:** Nenhum.
- **Resposta:** `string[]` (Array de 50 strings).

---

## 2. Métricas (Metrics)

### `POST /api/metrics`
Salva um novo log de telemetria e calcula as métricas finais (WPM, Accuracy).

- **Autenticação:** Obrigatória (NextAuth).
- **Corpo da Requisição (JSON):**
  ```json
  {
    "log": [
      { "key": "a", "time": 1711710000000, "expected": "a" },
      { "key": "Backspace", "time": 1711710000500, "expected": "a" },
      { "key": "b", "time": 1711710001000, "expected": "b" }
    ]
  }
  ```
- **Validação:** 
  - O `log` deve ser um array de `TypingEvent`.
  - Backspaces são suportados e processados no backend.
- **Resposta (Sucesso):**
  ```json
  { "success": true, "id": "clt..." }
  ```
- **Status Codes:**
  - `200`: Sucesso.
  - `400`: Log inválido ou malformado.
  - `401`: Não autorizado (usuário não logado).

---

## 3. Ranking

### `GET /api/metrics/ranking`
Retorna os melhores resultados globais ordenados por WPM (descendente).

- **Autenticação:** Não necessária (Público).
- **Parâmetros de Query:**
  - `limit` (opcional): Número de resultados (Padrão: 10, Máximo: 100).
- **Resposta:** `TypingMetric[]` (Array de objetos de métrica).

---

## 4. Meus Resultados (Me)

### `GET /api/metrics/me`
Retorna os resultados mais recentes do usuário autenticado.

- **Autenticação:** Obrigatória (NextAuth).
- **Parâmetros de Query:**
  - `limit` (opcional): Número de resultados (Padrão: 10, Máximo: 100).
- **Resposta:** `TypingMetric[]` (Array de objetos de métrica do próprio usuário).

---

## Tipos de Dados

### `TypingEvent`
Representa um evento individual de teclado durante o teste.
```typescript
type TypingEvent = {
  key: string;      // Caractere digitado (ou "Backspace")
  time: number;     // Timestamp (Unix ms)
  expected: string; // Caractere esperado na posição do cursor
};
```

### `TypingMetric`
Objeto persistido no banco de dados.
```typescript
type TypingMetric = {
  id: string;
  wpm: number;        // Words Per Minute (final)
  accuracy: number;   // Acurácia de 0 a 100 (final)
  duration: number;   // Duração total em segundos
  logHash: string;    // Hash SHA-224 (segurança/idempotência)
  events: TypingEvent[]; // O log completo em formato JSON
  createdAt: string;  // Data de criação (ISO string)
  userId: string;     // ID do usuário dono (NextAuth)
};
```
