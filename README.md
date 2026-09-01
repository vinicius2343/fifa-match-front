# FIFA Match — Frontend

Sorteador de partidas de FIFA. React + TypeScript + Vite + Tailwind CSS, consumindo um backend
Spring Boot local.

## Rodando o projeto

```bash
npm install
npm run dev
```

O app sobe em `http://localhost:5173` e espera o backend Spring Boot em
`http://localhost:8080`.

## Integração com o backend

- `GET /api/match/filters` — catálogo de filtros disponíveis (nada é hardcoded no frontend).
- `POST /api/match/randomize` — recebe `{ players, filters }` e retorna `{ teams, playersOut }`.

Toda a configuração do Axios está em `src/services/api.ts`, e as chamadas ficam centralizadas em
`src/services/matchService.ts` — nenhum componente chama a API diretamente.

### Contrato assumido para `GET /api/match/filters`

```json
{
  "CLUB": {
    "COUNTRY": [{ "value": "GERMANY", "label": "Alemanha" }],
    "LEAGUE": [{ "value": "BUNDESLIGA", "label": "Bundesliga" }],
    "RATING": [{ "value": "75", "label": "Até 75" }]
  },
  "NATIONAL_TEAM": {
    "RATING": [{ "value": "80", "label": "Até 80" }]
  }
}
```

Se a resposta real do seu backend tiver um formato diferente, o único arquivo que precisa mudar é
`src/services/matchService.ts` (função `getFilters`) — normalize o payload bruto para o tipo
`FiltersResponse` (`src/types/match.ts`) ali, e o resto do app continua funcionando sem alterações.

## CORS

Como o frontend roda em `http://localhost:5173` e o backend em `http://localhost:8080`, adicione
isso na configuração do Spring Boot (não foi alterado automaticamente, conforme pedido):

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins("http://localhost:5173")
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
    }
}
```

## Estrutura

```
src/
├── components/   # componentes de UI reutilizáveis
├── pages/        # Home.tsx compõe a tela principal
├── services/      # api.ts (axios) + matchService.ts (chamadas)
├── types/         # contratos TypeScript (match.ts)
├── hooks/         # usePlayers, useFilters, useMatchDraw
└── utils/         # validação de nomes de jogadores
```
