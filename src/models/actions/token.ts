export const SAGA_SAVE_TOKENS_TO_LOCAL = 'SAGA_SAVE_TOKENS_TO_LOCAL'
export type SAGA_SAVE_TOKENS_TO_LOCAL = typeof SAGA_SAVE_TOKENS_TO_LOCAL

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
