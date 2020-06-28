import { Status } from '../../reducers/status'
import {
  TestAnalysisDataType,
  AnalysisDataQuestionCollectStatus,
} from '../../reducers/tests/testAnalysis'

export const CHANGE_TEST_ANALYSIS_REQUEST_STATUS =
  'CHANGE_TEST_ANALYSIS_REQUEST_STATUS'
export const SAVE_TEST_ANALYSIS_DATA = 'SAVE_TEST_ANALYSIS_DATA'
export const RESET_TEST_ANALYSIS_STATE = 'RESET_TEST_ANALYSIS_STATE'
export const CHANGE_TEST_ANALYSIS_PAGE_TAB_INDEX =
  'CHANGE_TEST_ANALYSIS_PAGE_TAB_INDEX'
export const TOGGLE_ONLY_SHOW_MISTAKE_STATE = 'TOGGLE_ONLY_SHOW_MISTAKE_STATE'
export const CHANGE_TOGGLE_COLLECT_STATUS = 'CHANGE_TOGGLE_COLLECT_STATUS'
export const TOGGLE_COLLECT_STATE = 'TOGGLE_COLLECT_STATE'

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

export interface ChangeToggleCollectStatusAction {
  type: typeof CHANGE_TOGGLE_COLLECT_STATUS
  payload: Status
}

export function changeToggleCollectStatus(
  status: Status
): ChangeToggleCollectStatusAction {
  return { type: CHANGE_TOGGLE_COLLECT_STATUS, payload: status }
}

export interface ToggleCollectStateAction {
  type: typeof TOGGLE_COLLECT_STATE
  payload: {
    questionId: number
    isCollected: AnalysisDataQuestionCollectStatus
  }
}

export function toggleCollectStatus(
  questionId: number,
  isCollected: AnalysisDataQuestionCollectStatus
): ToggleCollectStateAction {
  return {
    type: TOGGLE_COLLECT_STATE,
    payload: {
      questionId,
      isCollected,
    },
  }
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
  | ChangeToggleCollectStatusAction
  | ToggleCollectStateAction

// =================
// SAGAS
// =================

export const SAGA_FETCH_TEST_ANALYSIS_DATA = 'SAGA_FETCH_TEST_ANALYSIS_DATA'
export const SAGA_CANCEL_FETCH_TEST_ANALYSIS_DATA =
  'SAGA_CANCEL_FETCH_TEST_ANALYSIS_DATA'
export const SAGA_UPDATE_COLLECT_STATUS = 'SAGA_UPDATE_COLLECT_STATUS'
export const SAGA_CANCEL_UPDATE_COLLECT_STATUS =
  'SAGA_CANCEL_UPDATE_COLLECT_STATUS'

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

// update collect status
export interface SagaUpdateCollectStatusAction {
  type: typeof SAGA_UPDATE_COLLECT_STATUS
  payload: {
    questionId: number
    isCollected: AnalysisDataQuestionCollectStatus
  }
}

export function sagaUpdateCollectStatus(
  questionId: number,
  isCollected: AnalysisDataQuestionCollectStatus
): SagaUpdateCollectStatusAction {
  return {
    type: SAGA_UPDATE_COLLECT_STATUS,
    payload: { questionId, isCollected },
  }
}

// cancel update collect status
export interface SagaCancelUpdateCollectStatusAction {
  type: typeof SAGA_CANCEL_UPDATE_COLLECT_STATUS
}

export function sagaCancelUpdateCollectStatus(): SagaCancelUpdateCollectStatusAction {
  return { type: SAGA_CANCEL_UPDATE_COLLECT_STATUS }
}
