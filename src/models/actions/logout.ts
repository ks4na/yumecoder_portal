import { Status } from '../reducers/status'

export const CHANGE_LOGOUT_STATUS = 'CHANGE_LOGOUT_STATUS'
export const RESET_LOGOUT_STATUS = 'RESET_LOGOUT_STATUS'

// =====================
// ACTION CREATORS
// =====================

export interface ChangeLogoutStatusAction {
  type: typeof CHANGE_LOGOUT_STATUS
  payload: Status
}

export function changeLogoutStatus(status: Status): ChangeLogoutStatusAction {
  return { type: CHANGE_LOGOUT_STATUS, payload: status }
}

export interface ResetLogoutStatusAction {
  type: typeof RESET_LOGOUT_STATUS
}

export function resetLogoutStatus(): ResetLogoutStatusAction {
  return { type: RESET_LOGOUT_STATUS }
}

// =====================
// ACTION TYPES
// =====================
export type LogoutActions = ChangeLogoutStatusAction | ResetLogoutStatusAction

// =====================
// SAGAS
// =====================
export const SAGA_REQUEST_LOGOUT = 'SAGA_REQUEST_LOGOUT'

export interface SagaRequestLogoutAction {
  type: typeof SAGA_REQUEST_LOGOUT
}

export function sagaRequestLogout(): SagaRequestLogoutAction {
  return { type: SAGA_REQUEST_LOGOUT }
}
