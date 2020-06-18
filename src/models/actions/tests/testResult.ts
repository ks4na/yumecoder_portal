import { Status } from '../../reducers/status'
import { TestResultData } from '../../reducers/tests/testResult'

export const CHANGE_TEST_RESULT_REQUEST_STATUS =
  'CHANGE_TEST_RESULT_REQUEST_STATUS'
export const SAVE_TEST_RESULT = 'SAVE_TEST_RESULT'
export const RESET_TEST_RESULT_STATE = 'RESET_TEST_RESULT_STATE'

// ====================
// ACTION CREATORS
// ====================

export interface ChangeTestResultRequestStatusAction {
  type: typeof CHANGE_TEST_RESULT_REQUEST_STATUS
  payload: Status
}

export function changeTestResultRequestStatus(
  status: Status
): ChangeTestResultRequestStatusAction {
  return {
    type: CHANGE_TEST_RESULT_REQUEST_STATUS,
    payload: status,
  }
}

export interface SaveTestResultAction {
  type: typeof SAVE_TEST_RESULT
  payload: TestResultData
}

export function saveTestResult(
  testResultData: TestResultData
): SaveTestResultAction {
  return {
    type: SAVE_TEST_RESULT,
    payload: testResultData,
  }
}

export interface ResetTestResultStateAction {
  type: typeof RESET_TEST_RESULT_STATE
}

export function resetTestResultState(): ResetTestResultStateAction {
  return { type: RESET_TEST_RESULT_STATE }
}

// ====================
// ACTION TYPES
// ====================

export type TestResultActions =
  | ChangeTestResultRequestStatusAction
  | SaveTestResultAction
  | ResetTestResultStateAction

// ====================
// SAGAS
// ====================

export const SAGA_FETCH_TEST_RESULT = 'SAGA_FETCH_TEST_RESULT'
export const SAGA_CANCEL_FETCH_TEST_RESULT = 'SAGA_CANCEL_FETCH_TEST_RESULT'

// fetch test result
export interface SagaFetchTestResultAction {
  type: typeof SAGA_FETCH_TEST_RESULT
  payload: number | string
}

export function sagaFetchTestResult(
  testId: number | string
): SagaFetchTestResultAction {
  return {
    type: SAGA_FETCH_TEST_RESULT,
    payload: testId,
  }
}

// cancel fetch test result
export interface SagaCancelFetchTestResultAction {
  type: typeof SAGA_CANCEL_FETCH_TEST_RESULT
}

export function sagaCancelFetchTestResult(): SagaCancelFetchTestResultAction {
  return { type: SAGA_CANCEL_FETCH_TEST_RESULT }
}
