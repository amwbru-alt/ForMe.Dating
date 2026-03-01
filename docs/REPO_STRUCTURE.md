# Целевая структура монорепозитория (MVP)

## Директории

```text
ForMe.Dating/
  apps/
    web/            # Frontend (лента, профиль, paywall, донаты)
    api/            # Backend API (auth, контент, подписки, платежи)
  packages/
    shared/         # Общие типы, DTO, константы, валидация
  docs/
    MVP_SPEC.md
    REPO_STRUCTURE.md
    API_CONTRACTS.md
    DB_SCHEMA.md
    FRONTEND_FLOWS.md
    LIKE_MATCH_MIGRATION.md
```

## Принципы

- `apps/web` и `apps/api` развиваются независимо, но используют единые контракты из `packages/shared`.
- Все публичные DTO и enum для клиент-серверного взаимодействия выносятся в `packages/shared`.
- Любые изменения контрактов сначала фиксируются в `docs/API_CONTRACTS.md`, затем реализуются в коде.
- Миграции БД и изменение доменной модели синхронизируются с `docs/DB_SCHEMA.md`.
