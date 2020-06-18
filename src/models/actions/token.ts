export const SAGA_SAVE_TOKENS_TO_LOCAL = 'SAGA_SAVE_TOKENS_TO_LOCAL'
export type SAGA_SAVE_TOKENS_TO_LOCAL = typeof SAGA_SAVE_TOKENS_TO_LOCAL

export const SAGA_CLEAR_TOKENS = 'SAGA_CLEAR_TOKENS'

export interface TokensType {
  accessToken?: string
  refreshToken?: string
}

export interface SagaSaveTokensToLocalAction {
  type: SAGA_SAVE_TOKENS_TO_LOCAL
  payload: TokensType
}

export function sagaSaveTokensToLocal(
  tokens: TokensType
): SagaSaveTokensToLocalAction {
  return {
    type: SAGA_SAVE_TOKENS_TO_LOCAL,
    payload: tokens,
  }
}

export interface SagaClearTokensAction {
  type: typeof SAGA_CLEAR_TOKENS
}

export function sagaClearTokens(): SagaClearTokensAction {
  return { type: SAGA_CLEAR_TOKENS }
}
