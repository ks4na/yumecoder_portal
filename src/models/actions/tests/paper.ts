import { Status } from '../../reducers/status'

export const CHANGE_PREPAREPAPER_STATUS = 'CHANGE_PREPAREPAPER_STATUS'

// ==================
// ACTION CREATORS
// ==================

export interface ChangePreparePaperStatusAction {
  type: typeof CHANGE_PREPAREPAPER_STATUS
  payload: Status
}

export function changePreparePaperStatus(
  status: Status
): ChangePreparePaperStatusAction {
  return {
    type: CHANGE_PREPAREPAPER_STATUS,
    payload: status,
  }
}

// ==================
// ACTION TYPES
// ==================

export type PaperActions = ChangePreparePaperStatusAction

// ==================
// SAGAS
// ==================

export const SAGA_REQUEST_PREPAREPAPER = 'SAGA_REQUEST_PREPAREPAPER'
export const SAGA_CANCEL_PREPAREPAPER = 'SAGA_CANCEL_PREPAREPAPER'

// request preparePaper
export interface SagaRequestPreparePaperAction {
  type: typeof SAGA_REQUEST_PREPAREPAPER
  payload: number
  successCallback?: (testId: number) => void
}

export function sagaRequestPreparePaper(
  categoryId: number,
  successCallback?: (testId: number) => void
): SagaRequestPreparePaperAction {
  return {
    type: SAGA_REQUEST_PREPAREPAPER,
    payload: categoryId,
    successCallback,
  }
}

// cancel preparePaper
export interface SagaCancelPreparePaperAction {
  type: typeof SAGA_CANCEL_PREPAREPAPER
}

export function sagaCancelPreparePaper(): SagaCancelPreparePaperAction {
  return {
    type: SAGA_CANCEL_PREPAREPAPER,
  }
}
