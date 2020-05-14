import {
  RegistStatus,
  EmailCheckStatus,
  EmailUsedStatus,
} from '../reducers/regist'
import { ActivateStatusActions } from './registActivate'

export const CHANGE_REGIST_STATUS = 'CHANGE_REGIST_STATUS'

export const CHANGE_EMAIL_CHECK_STATUS = 'CHANGE_EMAIL_CHECK_STATUS'

export const CHANGE_EMAIL_USED_STATUS = 'CHANGE_EMAIL_USED_STATUS'

export const SAVE_EMAIL_USED_STATUS = 'SAVE_EMAIL_USED_STATUS'

export const RESET_ALL_EMAIL_STATUS = 'RESET_ALL_EMAIL_STATUS'

// ================
// action creators
// ================

// change regist status
export interface ChangeRegistStatusAction {
  type: typeof CHANGE_REGIST_STATUS
  payload: RegistStatus
}

export function changeRegistStatus(
  status: RegistStatus
): ChangeRegistStatusAction {
  return {
    type: CHANGE_REGIST_STATUS,
    payload: status,
  }
}

// change email check status
export interface ChangeEmailCheckStatusAction {
  type: typeof CHANGE_EMAIL_CHECK_STATUS
  payload: EmailCheckStatus
}

export function changeEmailCheckStatus(
  status: EmailCheckStatus
): ChangeEmailCheckStatusAction {
  return {
    type: CHANGE_EMAIL_CHECK_STATUS,
    payload: status,
  }
}

// change emailUsedStatus
export interface ChangeEmailUsedStatusAction {
  type: typeof CHANGE_EMAIL_USED_STATUS
  payload: EmailUsedStatus
}

export function changeEmailUsedStatus(
  status: EmailUsedStatus
): ChangeEmailUsedStatusAction {
  return {
    type: CHANGE_EMAIL_USED_STATUS,
    payload: status,
  }
}

// save emailUsedStatus
export interface SaveEmailUsedStatusAction {
  type: typeof SAVE_EMAIL_USED_STATUS
  payload: EmailUsedStatus
}

export function saveEmailUsedStatus(
  emailUsedStatus: EmailUsedStatus
): SaveEmailUsedStatusAction {
  return {
    type: SAVE_EMAIL_USED_STATUS,
    payload: emailUsedStatus,
  }
}

// reset all email status
export interface ResetAllEmailStatusAction {
  type: typeof RESET_ALL_EMAIL_STATUS
}

export function resetAllEmailStatus(): ResetAllEmailStatusAction {
  return {
    type: RESET_ALL_EMAIL_STATUS,
  }
}

// ================
// action types
// ================

export type RegistActions =
  | ChangeRegistStatusAction
  | ChangeEmailCheckStatusAction
  | ChangeEmailUsedStatusAction
  | SaveEmailUsedStatusAction
  | ResetAllEmailStatusAction
  | ActivateStatusActions

// ================
// sagas
// ================

export const SAGA_REQUEST_REGIST = 'SAGA_REQUEST_REGIST'
export const SAGA_CANCEL_REGIST = 'SAGA_CANCEL_REGIST'

export const SAGA_REQUEST_EMAIL_CHECK = 'SAGA_REQUEST_EMAIL_CHECK'
export const SAGA_CANCEL_EMAIL_CHECK = 'SAGA_CANCEL_EMAIL_CHECK'

// request regist
export interface RegistParams {
  email: string
  password: string
  captcha: string
}

export interface SagaRequestRegistAction {
  type: typeof SAGA_REQUEST_REGIST
  payload: RegistParams
}

export function sagaRequestRegist(
  registParams: RegistParams
): SagaRequestRegistAction {
  return {
    type: SAGA_REQUEST_REGIST,
    payload: registParams,
  }
}

// cancel regist
export interface SagaCancelRegistAction {
  type: typeof SAGA_CANCEL_REGIST
}

export function sagaCancelRegist(): SagaCancelRegistAction {
  return {
    type: SAGA_CANCEL_REGIST,
  }
}

// request email check
export interface SagaRequestEmailCheckAction {
  type: typeof SAGA_REQUEST_EMAIL_CHECK
  payload: string
}

export function sagaRequestEmailCheck(
  email: string
): SagaRequestEmailCheckAction {
  return {
    type: SAGA_REQUEST_EMAIL_CHECK,
    payload: email,
  }
}

// cancel email check
export interface SagaCancelEmailCheckAction {
  type: typeof SAGA_CANCEL_EMAIL_CHECK
}

export function sagaCancelEmailCheck(): SagaCancelEmailCheckAction {
  return {
    type: SAGA_CANCEL_EMAIL_CHECK,
  }
}
