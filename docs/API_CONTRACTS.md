# API-контракты MVP

## 1) Аутентификация (Telegram)

### `POST /api/v1/auth/telegram`
- **Назначение**: вход пользователя через Telegram Login Widget / Mini App init data.
- **Request**:
  - `telegramId: string`
  - `username?: string`
  - `authDate: number`
  - `hash: string`
- **Response**:
  - `accessToken: string`
  - `refreshToken: string`
  - `user: UserDto`

### `POST /api/v1/auth/refresh`
- **Request**: `refreshToken: string`
- **Response**: новая пара токенов.

## 2) Профиль креатора

### `GET /api/v1/creators/:creatorId`
- **Response**: `CreatorProfileDto` + агрегаты (`subscribersCount`, `postsCount`).

### `PATCH /api/v1/creators/me`
- **Назначение**: редактирование профиля креатора.
- **Request**: `displayName`, `bio`, `avatarUrl`, `priceMonthly`.

### `POST /api/v1/creator-verification/requests`
- **Назначение**: отправка заявки на верификацию из меню пользователя.
- **Request**: `fullName`, `country`, `documentType`, `documentFrontUrl`, `selfieUrl`.
- **Response**: `verificationRequestId`, `status: pending`.

## 3) Лента (TikTok-style)

### `GET /api/v1/feed`
- **Query**: `cursor?: string`, `limit?: number`.
- **Response**:
  - `items: FeedItemDto[]`
  - `nextCursor?: string`

### `POST /api/v1/posts/:postId/view`
- **Назначение**: событие просмотра для аналитики/рекомендаций.

## 4) Подписки и платный доступ

### `POST /api/v1/subscriptions`
- **Request**: `creatorId`, `planId`.
- **Response**: `subscriptionId`, `status`.

### `GET /api/v1/subscriptions/me`
- **Response**: список активных/истёкших подписок пользователя.

### `POST /api/v1/unlocks`
- **Назначение**: разовый unlock платного фото/видео.
- **Request**: `postId`.
- **Response**: `unlockId`, `accessGranted: true`.

## 5) Донаты

### `POST /api/v1/donations`
- **Request**: `creatorId`, `amount`, `currency`, `message?`.
- **Response**: `donationId`, `status`.

## 6) Раздел like=match (новый смысл)

### `GET /api/v1/me/following`
- **Назначение**: вкладка «Я подписан» (кого я фолловлю/на кого подписан).

### `GET /api/v1/me/subscribers`
- **Назначение**: вкладка «Мои подписки» (кто подписан на меня).
