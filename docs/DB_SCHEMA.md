# Схема БД MVP (черновик)

## Таблицы

## `users`
- `id` (uuid, pk)
- `telegram_id` (text, unique, not null)
- `username` (text, null)
- `role` (enum: `user`, `creator`, `admin`)
- `created_at`, `updated_at`

## `creator_profiles`
- `id` (uuid, pk)
- `user_id` (uuid, fk -> users.id, unique)
- `display_name` (text)
- `bio` (text)
- `avatar_url` (text)
- `price_monthly` (numeric)
- `is_verified` (boolean)
- `created_at`, `updated_at`

## `verification_requests`
- `id` (uuid, pk)
- `user_id` (uuid, fk -> users.id)
- `status` (enum: `pending`, `approved`, `rejected`)
- `full_name`, `country`, `document_type` (text)
- `document_front_url`, `selfie_url` (text)
- `reviewed_by` (uuid, fk -> users.id, null)
- `review_comment` (text, null)
- `created_at`, `updated_at`

## `media_posts`
- `id` (uuid, pk)
- `creator_id` (uuid, fk -> creator_profiles.id)
- `media_type` (enum: `photo`, `video`)
- `media_url` (text)
- `preview_url` (text, null)
- `caption` (text, null)
- `visibility` (enum: `public`, `subscribers_only`, `ppv`)
- `ppv_price` (numeric, null)
- `created_at`, `updated_at`

## `subscriptions`
- `id` (uuid, pk)
- `subscriber_user_id` (uuid, fk -> users.id)
- `creator_id` (uuid, fk -> creator_profiles.id)
- `status` (enum: `active`, `canceled`, `expired`)
- `current_period_start`, `current_period_end` (timestamp)
- `created_at`, `updated_at`

## `paid_unlocks`
- `id` (uuid, pk)
- `user_id` (uuid, fk -> users.id)
- `post_id` (uuid, fk -> media_posts.id)
- `amount` (numeric)
- `currency` (text)
- `created_at`

## `donations`
- `id` (uuid, pk)
- `from_user_id` (uuid, fk -> users.id)
- `creator_id` (uuid, fk -> creator_profiles.id)
- `amount` (numeric)
- `currency` (text)
- `message` (text, null)
- `created_at`

## `transactions`
- `id` (uuid, pk)
- `user_id` (uuid, fk -> users.id)
- `type` (enum: `subscription`, `unlock`, `donation`)
- `reference_id` (uuid)
- `provider` (text)
- `provider_payment_id` (text)
- `status` (enum: `pending`, `succeeded`, `failed`, `refunded`)
- `amount` (numeric)
- `currency` (text)
- `created_at`, `updated_at`

## `post_views`
- `id` (uuid, pk)
- `post_id` (uuid, fk -> media_posts.id)
- `viewer_user_id` (uuid, fk -> users.id)
- `viewed_at` (timestamp)

## Индексы MVP

- `users(telegram_id)` unique
- `media_posts(creator_id, created_at desc)`
- `subscriptions(subscriber_user_id, status)`
- `subscriptions(creator_id, status)`
- `paid_unlocks(user_id, post_id)` unique
- `post_views(post_id, viewed_at desc)`
