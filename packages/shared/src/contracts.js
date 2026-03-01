/**
 * Общие контракты MVP для web/api.
 * Это минимальный runtime-модуль для текущего этапа переписывания.
 */

export const UserRole = Object.freeze({
  USER: 'user',
  CREATOR: 'creator',
  ADMIN: 'admin'
});

export const MediaVisibility = Object.freeze({
  PUBLIC: 'public',
  SUBSCRIBERS_ONLY: 'subscribers_only',
  PPV: 'ppv'
});

export const TransactionType = Object.freeze({
  SUBSCRIPTION: 'subscription',
  UNLOCK: 'unlock',
  DONATION: 'donation'
});
