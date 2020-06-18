import { Status } from '../../reducers/status'
import { ShortcutListCountData } from '../../reducers/home/shortcutListCount'

export const CHANGE_SHORTCUTLIST_COUNT_STATUS =
  'CHANGE_SHORTCUTLIST_COUNT_STATUS'
export const SAVE_SHORTCUTLIST_COUNT_DATA = 'SAVE_SHORTCUTLIST_COUNT_DATA'
export const RESET_SHORTCUTLIST_COUNT_STATE = 'RESET_SHORTCUTLIST_COUNT_STATE'

// =========================
// ACTION CREATORS
// =========================

export interface ChangeShortcutListCountStatusAction {
  type: typeof CHANGE_SHORTCUTLIST_COUNT_STATUS
  payload: Status
}

export function changeShortcutListCountStatus(
  status: Status
): ChangeShortcutListCountStatusAction {
  return { type: CHANGE_SHORTCUTLIST_COUNT_STATUS, payload: status }
}

export interface SaveShortcutListCountDataAction {
  type: typeof SAVE_SHORTCUTLIST_COUNT_DATA
  payload: ShortcutListCountData
}

export function saveShortcutListCountData(
  data: ShortcutListCountData
): SaveShortcutListCountDataAction {
  return {
    type: SAVE_SHORTCUTLIST_COUNT_DATA,
    payload: data,
  }
}

export interface ResetShortcutListCountStateAction {
  type: typeof RESET_SHORTCUTLIST_COUNT_STATE
}

export function resetShortcutListCountState(): ResetShortcutListCountStateAction {
  return { type: RESET_SHORTCUTLIST_COUNT_STATE }
}

// =========================
// ACTION TYPES
// =========================

export type ShortcutListCountActions =
  | ChangeShortcutListCountStatusAction
  | SaveShortcutListCountDataAction
  | ResetShortcutListCountStateAction

// =========================
// SAGAS
// =========================

export const SAGA_FETCH_SHORTCUTLIST_COUNT = 'SAGA_FETCH_SHORTCUTLIST_COUNT'
export const SAGA_CANCEL_FETCH_SHORTCUTLIST_COUNT =
  'SAGA_CANCEL_FETCH_SHORTCUTLIST_COUNT'

// fetch shortcutListCount
export interface SagaFetchShortcutListCountAction {
  type: typeof SAGA_FETCH_SHORTCUTLIST_COUNT
}

export function sagaFetchShortcutListCount(): SagaFetchShortcutListCountAction {
  return { type: SAGA_FETCH_SHORTCUTLIST_COUNT }
}

// cancel fetch shortcutListCount
export interface SagaCancelFetchShortcutListCountAction {
  type: typeof SAGA_CANCEL_FETCH_SHORTCUTLIST_COUNT
}

export function sagaCancelFetchShortcutListCount(): SagaCancelFetchShortcutListCountAction {
  return { type: SAGA_CANCEL_FETCH_SHORTCUTLIST_COUNT }
}
