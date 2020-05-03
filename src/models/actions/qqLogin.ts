import { LoginStatus } from '../reducers/login'

export const CHANGE_QQ_LOGIN_STATUS = 'CHANGE_QQ_LOGIN_STATUS'

// ===============
// action creators
// ===============

interface ChangeQQLoginStatusAction {
  type: typeof CHANGE_QQ_LOGIN_STATUS
  payload: LoginStatus
}

export function changeQQLoginStatus(
  status: LoginStatus
): ChangeQQLoginStatusAction {
  return {
    type: CHANGE_QQ_LOGIN_STATUS,
    payload: status,
  }
}

// ===============
// Action Types
// ===============

export type QQLoginActions = ChangeQQLoginStatusAction

// ===============
// sagas
// ===============

export const SAGA_REQUEST_QQ_LOGIN = 'SAGA_REQUEST_QQ_LOGIN'
export const SAGA_CANCEL_QQ_LOGIN = 'SAGA_CANCEL_QQ_LOGIN'

interface QQLoginParams {
  openId: string
  nickname: string
  gender: string
  avatar: string
}

export interface SagaRequestQQLoginAction {
  type: typeof SAGA_REQUEST_QQ_LOGIN
  payload: QQLoginParams
}

export function sagaRequestQQLogin(
  qqLoginParams: QQLoginParams
): SagaRequestQQLoginAction {
  return {
    type: SAGA_REQUEST_QQ_LOGIN,
    payload: qqLoginParams,
  }
}

export interface SagaCancelQQLoginAction {
  type: typeof SAGA_CANCEL_QQ_LOGIN
}

export function sagaCancelQQLogin(): SagaCancelQQLoginAction {
  return { type: SAGA_CANCEL_QQ_LOGIN }
}
