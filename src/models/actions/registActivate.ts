import { ActivateStatus } from '../reducers/regist'

export const CHANGE_ACTIVATE_STATUS = 'CHANGE_ACTIVATE_STATUS'

// =================
// action creators
// =================

export interface ChangeActivateStatusAction {
  type: typeof CHANGE_ACTIVATE_STATUS
  payload: ActivateStatus
}

export function changeActivateStatus(
  status: ActivateStatus
): ChangeActivateStatusAction {
  return {
    type: CHANGE_ACTIVATE_STATUS,
    payload: status,
  }
}

// =================
// action types
// =================

export type ActivateStatusActions = ChangeActivateStatusAction

// =================
// sagas
// =================
export const SAGA_REQUEST_ACTIVATE = 'SAGA_REQUEST_ACTIVATE'

export const SAGA_CANCEL_ACTIVATE = 'SAGA_CANCEL_ACTIVATE'

// request activate
export interface ActivateParams {
  email: string
  activeCode: string
}

export interface SagaRequestActivateAction {
  type: typeof SAGA_REQUEST_ACTIVATE
  payload: ActivateParams
}

export function sagaRequestActivate(
  activateParams: ActivateParams
): SagaRequestActivateAction {
  return {
    type: SAGA_REQUEST_ACTIVATE,
    payload: activateParams,
  }
}

// cancel activate
export interface SagaCancelActivateAction {
  type: typeof SAGA_CANCEL_ACTIVATE
}

export function sagaCancelActivate(): SagaCancelActivateAction {
  return {
    type: SAGA_CANCEL_ACTIVATE,
  }
}
