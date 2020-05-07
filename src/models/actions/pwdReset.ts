import { Status } from '../reducers/status'

export const CHANGE_PWD_RESET_EMAIL_VALIDATE_STATUS =
  'CHANGE_PWD_RESET_EMAIL_VALIDATE_STATUS'
export const RESET_PWD_RESET_EMAIL_VALIDATE_STATUS =
  'RESET_PWD_RESET_EMAIL_VALIDATE_STATUS'

export const CHANGE_PWD_RESET_STATUS = 'CHANGE_PWD_RESET_STATUS'
export const RESET_PWD_RESET_STATUS = 'RESET_PWD_RESET_STATUS'

// ==================
// ACTION CREATORS
// ==================

export interface ChangePwdResetEmailValidateStatusAction {
  type: typeof CHANGE_PWD_RESET_EMAIL_VALIDATE_STATUS
  payload: Status
}

// email validate status
export function changePwdResetEmailValidateStatus(
  status: Status
): ChangePwdResetEmailValidateStatusAction {
  return {
    type: CHANGE_PWD_RESET_EMAIL_VALIDATE_STATUS,
    payload: status,
  }
}

export interface ResetPwdResetEmailValidateStatusAction {
  type: typeof RESET_PWD_RESET_EMAIL_VALIDATE_STATUS
}

export function resetPwdResetEmailValidateStatus(): ResetPwdResetEmailValidateStatusAction {
  return {
    type: RESET_PWD_RESET_EMAIL_VALIDATE_STATUS,
  }
}

// pwd reset status
export interface ChangePwdResetStatusAction {
  type: typeof CHANGE_PWD_RESET_STATUS
  payload: Status
}

export function changePwdResetStatus(
  status: Status
): ChangePwdResetStatusAction {
  return {
    type: CHANGE_PWD_RESET_STATUS,
    payload: status,
  }
}

export interface ResetPwdResetStatusAction {
  type: typeof RESET_PWD_RESET_STATUS
}

export function resetPwdResetStatus(): ResetPwdResetStatusAction {
  return {
    type: RESET_PWD_RESET_STATUS,
  }
}

// ==================
// ACTION TYPES
// ==================

export type PwdResetActions =
  | ChangePwdResetEmailValidateStatusAction
  | ResetPwdResetEmailValidateStatusAction
  | ChangePwdResetStatusAction
  | ResetPwdResetStatusAction

// ==================
// SAGAS
// ==================

export const SAGA_REQUEST_PWD_RESET_EMAIL_VALIDATION =
  'SAGA_REQUEST_PWD_RESET_EMAIL_VALIDATION'
export const SAGA_CANCEL_PWD_RESET_EMAIL_VALIDATION =
  'SAGA_CANCEL_PWD_RESET_EMAIL_VALIDATION'

export const SAGA_REQUEST_PWD_RESET = 'SAGA_REQUEST_PWD_RESET'
export const SAGA_CANCEL_PWD_RESET = 'SAGA_CANCEL_PWD_RESET'

// request pwdReset email validation
export interface EmailValidationParams {
  email: string
  captcha: string
}
export interface SagaRequestPwdResetEmailValidationAction {
  type: typeof SAGA_REQUEST_PWD_RESET_EMAIL_VALIDATION
  payload: EmailValidationParams
}

export function sagaRequestPwdResetEmailValidation(
  params: EmailValidationParams
): SagaRequestPwdResetEmailValidationAction {
  return {
    type: SAGA_REQUEST_PWD_RESET_EMAIL_VALIDATION,
    payload: params,
  }
}

// cancel pwdReset email validation
export interface SagaCancelPwdResetEmailValidationAction {
  type: typeof SAGA_CANCEL_PWD_RESET_EMAIL_VALIDATION
}

export function sagaCancelPwdResetEmailValidation(): SagaCancelPwdResetEmailValidationAction {
  return { type: SAGA_CANCEL_PWD_RESET_EMAIL_VALIDATION }
}

// request pwd reset
export interface PwdResetParams {
  email: string
  password: string
  validationCode: string
}

export interface SagaRequestPwdResetAction {
  type: typeof SAGA_REQUEST_PWD_RESET
  payload: PwdResetParams
}

export function sagaRequestPwdReset(
  params: PwdResetParams
): SagaRequestPwdResetAction {
  return {
    type: SAGA_REQUEST_PWD_RESET,
    payload: params,
  }
}

// cancel pwd reset
export interface SagaCancelPwdResetAction {
  type: typeof SAGA_CANCEL_PWD_RESET
}

export function sagaCancelPwdReset(): SagaCancelPwdResetAction {
  return { type: SAGA_CANCEL_PWD_RESET }
}
