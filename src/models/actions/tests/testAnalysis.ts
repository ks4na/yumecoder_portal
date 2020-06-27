import { Status } from '../../reducers/status'
import { TestAnalysisDataType } from '../../reducers/tests/testAnalysis'

export const CHANGE_TEST_ANALYSIS_REQUEST_STATUS =
  'CHANGE_TEST_ANALYSIS_REQUEST_STATUS'
export const SAVE_TEST_ANALYSIS_DATA = 'SAVE_TEST_ANALYSIS_DATA'
export const RESET_TEST_ANALYSIS_STATE = 'RESET_TEST_ANALYSIS_STATE'
export const CHANGE_TEST_ANALYSIS_PAGE_TAB_INDEX =
  'CHANGE_TEST_ANALYSIS_PAGE_TAB_INDEX'
export const TOGGLE_ONLY_SHOW_MISTAKE_STATE = 'TOGGLE_ONLY_SHOW_MISTAKE_STATE'

// =================
// ACTION CREATORS
// =================

export interface ChangeTestAnalysisRequestStatusAction {
  type: typeof CHANGE_TEST_ANALYSIS_REQUEST_STATUS
  payload: Status
}

export function changeTestAnalysisRequestStatus(
  status: Status
): ChangeTestAnalysisRequestStatusAction {
  return { type: CHANGE_TEST_ANALYSIS_REQUEST_STATUS, payload: status }
}

export interface SaveTestAnalysisDataAction {
  type: typeof SAVE_TEST_ANALYSIS_DATA
  payload: TestAnalysisDataType
}

export function saveTestAnalysisData(
  data: TestAnalysisDataType
): SaveTestAnalysisDataAction {
  return { type: SAVE_TEST_ANALYSIS_DATA, payload: data }
}

export interface ResetTestAnalysisStateAction {
  type: typeof RESET_TEST_ANALYSIS_STATE
}

export function resetTestAnalysisState(): ResetTestAnalysisStateAction {
  return { type: RESET_TEST_ANALYSIS_STATE }
}

export interface ChangeTabIndexAction {
  type: typeof CHANGE_TEST_ANALYSIS_PAGE_TAB_INDEX
  payload: number
}

export function changeTabIndex(index: number): ChangeTabIndexAction {
  return {
    type: CHANGE_TEST_ANALYSIS_PAGE_TAB_INDEX,
    payload: index,
  }
}

export interface ToggleOnlyShowMistakeStateAction {
  type: typeof TOGGLE_ONLY_SHOW_MISTAKE_STATE
  payload?: boolean
}

export function toggleOnlyShowMistakeState(
  state?: boolean
): ToggleOnlyShowMistakeStateAction {
  return { type: TOGGLE_ONLY_SHOW_MISTAKE_STATE, payload: state }
}

// =================
// ACTION TYPES
// =================

export type TestAnalysisActions =
  | ChangeTestAnalysisRequestStatusAction
  | SaveTestAnalysisDataAction
  | ResetTestAnalysisStateAction
  | ChangeTabIndexAction
  | ToggleOnlyShowMistakeStateAction

// =================
// SAGAS
// =================

export const SAGA_FETCH_TEST_ANALYSIS_DATA = 'SAGA_FETCH_TEST_ANALYSIS_DATA'
export const SAGA_CANCEL_FETCH_TEST_ANALYSIS_DATA =
  'SAGA_CANCEL_FETCH_TEST_ANALYSIS_DATA'

// fetch testAnalysis data
export interface SagaFetchTestAnalysisDataAction {
  type: typeof SAGA_FETCH_TEST_ANALYSIS_DATA
  payload: number | string
}

export function sagaFetchTestAnalysisData(
  testId: number | string
): SagaFetchTestAnalysisDataAction {
  return { type: SAGA_FETCH_TEST_ANALYSIS_DATA, payload: testId }
}

// cancel fetch testAnalysis data
export interface SagaCancelFetchTestAnalysisDataAction {
  type: typeof SAGA_CANCEL_FETCH_TEST_ANALYSIS_DATA
}

export function sagaCancelFetchTestAnalysisData(): SagaCancelFetchTestAnalysisDataAction {
  return { type: SAGA_CANCEL_FETCH_TEST_ANALYSIS_DATA }
}
