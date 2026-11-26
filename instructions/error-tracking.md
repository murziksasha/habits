# Отслеживание ошибок (Sentry) и request id

## Sentry — по желанию

Выключен, пока не задан DSN: SDK даже не загружается (динамический `import()` только при заданной переменной).

| Переменная | Где | Что |
| --- | --- | --- |
| `SENTRY_DSN` | api, realtime, web (сервер) | DSN проекта. Пусто — Sentry выключен |
| `NEXT_PUBLIC_SENTRY_DSN` | web (браузер) | Подставляется **при сборке** (`next build`, build-arg в Docker). Пусто — код Sentry не попадает в бандл |
| `SENTRY_ENVIRONMENT` | все | По умолчанию `NODE_ENV` |
| `SENTRY_RELEASE` | все | Например SHA коммита |
| `SENTRY_TRACES_SAMPLE_RATE` | все | Доля трассировок, по умолчанию `0` (только ошибки) |

Что отправляется:

- **API** (`apps/api/src/sentry.ts`): необработанные ошибки из `app.onError` (кроме нарушений уникальности → `409 conflict`) с тегами `request_id`, `http.method`, `http.path`, плюс `unhandledRejection`. Тело запроса и cookies не отправляются.
- **Realtime** (`apps/realtime/src/sentry.ts`): `unhandledRejection` (в т.ч. из async-обработчиков сокетов) и ошибки серверного sweep (тег `task=sweep`).
- **Web**: `src/instrumentation.ts` (серверные ошибки рендера через `onRequestError`) и `src/instrumentation-client.ts` (браузер). `withSentryConfig` и загрузка source maps не подключены — при желании это отдельный шаг с `SENTRY_AUTH_TOKEN`.

Проверено: без DSN `initSentry` возвращает `false`, захват — no-op (тест `apps/api/src/sentry.test.ts`); с фиктивным DSN SDK инициализируется. Отправка в настоящий Sentry не проверялась (нет проекта/DSN). Сборка web без DSN: размер бандла не изменился.

## Request id в логах

- API берёт `x-request-id` (или `x-correlation-id`) из запроса, только если это не длиннее 64 символов из `[A-Za-z0-9._:-]` (иначе — защита от подделки строк лога — генерирует свой), и возвращает его в заголовке ответа `x-request-id`.
- Через `AsyncLocalStorage` (`runWithRequestId` в `apps/api/src/logger.ts`) **каждая** строка JSON-лога внутри запроса содержит `requestId` — не только access-лог, но и логи маршрутов и сервисов. Тот же id приходит клиенту в теле ошибки `500` (`{ "error": "internal", "requestId": … }`) и ставится тегом `request_id` в Sentry — по нему можно связать жалобу пользователя, лог и событие.
