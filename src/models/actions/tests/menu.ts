import { Status } from '../../reducers/status'
import { TestMenuData } from '../../reducers/tests/menu'

export const CHANGE_TEST_MENU_STATUS = 'CHANGE_TEST_MENU_STATUS'
export const SAVE_TEST_MENU_DATA = 'SAVE_TEST_MENU_DATA'
export const RESET_TEST_MENU_STATE = 'RESET_TEST_MENU_STATE'

// =================
// ACTION CREATORS
// =================

// changeTestMenuStatus
export interface ChangeTestMenuStatusAction {
  type: typeof CHANGE_TEST_MENU_STATUS
  payload: Status
}

export function changeTestMenuStatus(
  status: Status
): ChangeTestMenuStatusAction {
  return {
    type: CHANGE_TEST_MENU_STATUS,
    payload: status,
  }
}

// saveTestMenuData
export interface SaveTestMenuDataAction {
  type: typeof SAVE_TEST_MENU_DATA
  payload: TestMenuData
}

export function saveTestMenuData(data: TestMenuData): SaveTestMenuDataAction {
  return {
    type: SAVE_TEST_MENU_DATA,
    payload: data,
  }
}

// resetTestMenuState
export interface ResetTestMenuStateAction {
  type: typeof RESET_TEST_MENU_STATE
}

export function resetTestMenuState(): ResetTestMenuStateAction {
  return { type: RESET_TEST_MENU_STATE }
}

// =================
// ACTION TYPES
// =================
export type TestMenuActions =
  | ChangeTestMenuStatusAction
  | SaveTestMenuDataAction
  | ResetTestMenuStateAction

// =================
// SAGAS
// =================

export const SAGA_FETCH_TEST_MENU_DATA = 'SAGA_FETCH_TEST_MENU_DATA'
export const SAGA_CANCEL_FETCH_TEST_MENU_DATA =
  'SAGA_CANCEL_FETCH_TEST_MENU_DATA'

// request testMenu data
export interface SagaFetchTestMenuDataAction {
  type: typeof SAGA_FETCH_TEST_MENU_DATA
}

export function sagaFetchTestMenuData(): SagaFetchTestMenuDataAction {
  return { type: SAGA_FETCH_TEST_MENU_DATA }
}

// cancel request testMenuData
export interface SagaCancelFetchTestMenuDataAction {
  type: typeof SAGA_CANCEL_FETCH_TEST_MENU_DATA
}

export function sagaCancelFetchTestMenuData(): SagaCancelFetchTestMenuDataAction {
  return { type: SAGA_CANCEL_FETCH_TEST_MENU_DATA }
}
