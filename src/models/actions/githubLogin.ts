// “登录中” 状态
export const GITHUB_LOGIN_STATUS_LOGGINGIN = 'GITHUB_LOGIN_STATUS_LOGGINGIN'
export type GITHUB_LOGIN_STATUS_LOGGINGIN = typeof GITHUB_LOGIN_STATUS_LOGGINGIN

// “登录成功” 状态
export const GITHUB_LOGIN_STATUS_SUCCESS = 'GITHUB_LOGIN_STATUS_SUCCESS'
export type GITHUB_LOGIN_STATUS_SUCCESS = typeof GITHUB_LOGIN_STATUS_SUCCESS

// “登录失败” 状态
export const GITHUB_LOGIN_STATUS_FAILED = 'GITHUB_LOGIN_STATUS_FAILED'
export type GITHUB_LOGIN_STATUS_FAILED = typeof GITHUB_LOGIN_STATUS_FAILED

// “登录取消” 状态
export const GITHUB_LOGIN_STATUS_CANCELLED = 'GITHUB_LOGIN_STATUS_CANCELLED'
export type GITHUB_LOGIN_STATUS_CANCELLED = typeof GITHUB_LOGIN_STATUS_CANCELLED

// 重置登录状态为初始值
export const GITHUB_LOGIN_STATUS_RESET = 'GITHUB_LOGIN_STATUS_RESET'
export type GITHUB_LOGIN_STATUS_RESET = typeof GITHUB_LOGIN_STATUS_RESET

export interface GithubLoggingInAction {
  type: GITHUB_LOGIN_STATUS_LOGGINGIN
}

export function setGithubLoggingInStatus(): GithubLoggingInAction {
  return {
    type: GITHUB_LOGIN_STATUS_LOGGINGIN,
  }
}

export interface GithubLoginSuccessAction {
  type: GITHUB_LOGIN_STATUS_SUCCESS
}

export function setGithubLoginSuccessStatus(): GithubLoginSuccessAction {
  return {
    type: GITHUB_LOGIN_STATUS_SUCCESS,
  }
}

export interface GithubLoginFailedAction {
  type: GITHUB_LOGIN_STATUS_FAILED
}

export function setGithubLoginFailedStatus(): GithubLoginFailedAction {
  return {
    type: GITHUB_LOGIN_STATUS_FAILED,
  }
}

export interface GithubLoginCancelledAction {
  type: GITHUB_LOGIN_STATUS_CANCELLED
}

export function setGithubLoginCancelledStatus(): GithubLoginCancelledAction {
  return {
    type: GITHUB_LOGIN_STATUS_CANCELLED,
  }
}

export interface GithubLoginStatusResetAction {
  type: GITHUB_LOGIN_STATUS_RESET
}

export function resetGithubLoginStatus(): GithubLoginStatusResetAction {
  return {
    type: GITHUB_LOGIN_STATUS_RESET,
  }
}

export type GithubLoginActions =
  | GithubLoggingInAction
  | GithubLoginSuccessAction
  | GithubLoginFailedAction
  | GithubLoginCancelledAction
  | GithubLoginStatusResetAction

//////////
// sagas
//////////

export const SAGA_GITHUB_LOGIN = 'SAGA_GITHUB_LOGIN'
export type SAGA_GITHUB_LOGIN = typeof SAGA_GITHUB_LOGIN

export interface SagaGithubLoginPayloadType {
  code: string
}

export interface SagaGithubLoginAction {
  type: SAGA_GITHUB_LOGIN
  payload: SagaGithubLoginPayloadType
}

export function sagaGithubLogin(
  githubLoginPayload: SagaGithubLoginPayloadType
): SagaGithubLoginAction {
  return {
    type: SAGA_GITHUB_LOGIN,
    payload: githubLoginPayload,
  }
}
