// “登录中” 状态
export const LOGIN_STATUS_LOGGINGIN = 'LOGIN_STATUS_LOGGINGIN'
export type LOGIN_STATUS_LOGGINGIN = typeof LOGIN_STATUS_LOGGINGIN

// “登录成功” 状态
export const LOGIN_STATUS_SUCCESS = 'LOGIN_STATUS_SUCCESS'
export type LOGIN_STATUS_SUCCESS = typeof LOGIN_STATUS_SUCCESS

// “登录失败” 状态
export const LOGIN_STATUS_FAILED = 'LOGIN_STATUS_FAILED'
export type LOGIN_STATUS_FAILED = typeof LOGIN_STATUS_FAILED

// “登录取消” 状态
export const LOGIN_STATUS_CANCELLED = 'LOGIN_STATUS_CANCELLED'
export type LOGIN_STATUS_CANCELLED = typeof LOGIN_STATUS_CANCELLED

// 重置登录状态为初始值
export const LOGIN_STATUS_RESET = 'LOGIN_STATUS_RESET'
export type LOGIN_STATUS_RESET = typeof LOGIN_STATUS_RESET

export interface LoggingInAction {
  type: LOGIN_STATUS_LOGGINGIN
}

export function setLoggingInStatus(): LoggingInAction {
  return {
    type: LOGIN_STATUS_LOGGINGIN,
  }
}

export interface LoginSuccessAction {
  type: LOGIN_STATUS_SUCCESS
}

export function setLoginSuccessStatus(): LoginSuccessAction {
  return {
    type: LOGIN_STATUS_SUCCESS,
  }
}

export interface LoginFailedAction {
  type: LOGIN_STATUS_FAILED
  payload: string
}

export function setLoginFailedStatus(msg: string): LoginFailedAction {
  return {
    type: LOGIN_STATUS_FAILED,
    payload: msg,
  }
}

export interface LoginCancelledAction {
  type: LOGIN_STATUS_CANCELLED
}

export function setLoginCancelledStatus(): LoginCancelledAction {
  return {
    type: LOGIN_STATUS_CANCELLED,
  }
}

export interface LoginStatusResetAction {
  type: LOGIN_STATUS_RESET
}

export function resetLoginStatus(): LoginStatusResetAction {
  return {
    type: LOGIN_STATUS_RESET,
  }
}

export type LoginActions =
  | LoggingInAction
  | LoginSuccessAction
  | LoginFailedAction
  | LoginCancelledAction
  | LoginStatusResetAction

//////////
// sagas
//////////

export const SAGA_USER_LOGIN = 'SAGA_USER_LOGIN'
export type SAGA_USER_LOGIN = typeof SAGA_USER_LOGIN

export const SAGA_SAVE_TOKENS_TO_LOCAL = 'SAGA_SAVE_TOKENS_TO_LOCAL'
export type SAGA_SAVE_TOKENS_TO_LOCAL = typeof SAGA_SAVE_TOKENS_TO_LOCAL

export interface UserLoginPayloadType {
  account: string
  password: string
}

export interface SagaUserLoginAction {
  type: SAGA_USER_LOGIN
  payload: UserLoginPayloadType
}

export function sagaUserLogin(
  loginPayload: UserLoginPayloadType
): SagaUserLoginAction {
  return {
    type: SAGA_USER_LOGIN,
    payload: loginPayload,
  }
}
