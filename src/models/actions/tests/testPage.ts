import { Status } from '../../reducers/status'
import { PaperDataType, Type } from '../../reducers/tests/testPage'
import { TempTestInfoType } from '../../../configs/tempTestInfo'

export const CHANGE_TEST_PAPER_FETCHING_STATUS =
  'CHANGE_TEST_PAPER_FETCHING_STATUS'
export const SAVE_TEST_PAPER = 'SAVE_TEST_PAPER'
export const RESET_TEST_PAGE_INFO = 'RESET_TEST_PAGE_INFO'
export const TOGGLE_EXIT_HALFWAY_DIALOG_STATE =
  'TOGGLE_EXIT_HALFWAY_DIALOG_STATE'
export const TOGGLE_PAPER_HAS_DONE_FLAG = 'TOGGLE_PAPER_HAS_DONE_FLAG'
export const UDPATE_SPENT_TIME = 'UDPATE_SPENT_TIME'
export const TOGGLE_TIMER_PAUSE_STATE = 'TOGGLE_TIMER_PAUSE_STATE'
export const CHANGE_CURRENT_TAB_PANEL = 'CHANGE_CURRENT_TAB_PANEL'
export const UPDATE_USER_ANSWERS = 'UPDATE_USER_ANSWERS'
export const SYNC_TEMP_TEST_INFO = 'SYNC_TEMP_TEST_INFO'
export const TOGGLE_ANSWER_CARD = 'TOGGLE_ANSWER_CARD'
export const CHANGE_PAPER_SUBMIT_STATUS = 'CHANGE_PAPER_SUBMIT_STATUS'
export const TOGGLE_RETRY_SUBMIT_DIALOG = 'TOGGLE_RETRY_SUBMIT_DIALOG'
export const TOGGLE_PAPER_HAS_DONE_DIALOG = 'TOGGLE_PAPER_HAS_DONE_DIALOG'
export const TOGGLE_RETRY_SAVE_TEMP_DIALOG = 'TOGGLE_RETRY_SAVE_TEMP_DIALOG'
export const CHANGE_TEMP_TEST_INFO_SAVING_STATUS =
  'CHANGE_TEMP_TEST_INFO_SAVING_STATUS'
export const TOGGLE_SHOULD_EXIT_ANYWAY = 'TOGGLE_SHOULD_EXIT_ANYWAY'

// ====================
// ACTION CREATORS
// ====================

export interface ChangeTestPaperFetchingStatusAction {
  type: typeof CHANGE_TEST_PAPER_FETCHING_STATUS
  payload: Status
}

export function changeTestPaperFetchingStatus(
  status: Status
): ChangeTestPaperFetchingStatusAction {
  return {
    type: CHANGE_TEST_PAPER_FETCHING_STATUS,
    payload: status,
  }
}

export interface SaveTestPaperAction {
  type: typeof SAVE_TEST_PAPER
  payload: PaperDataType
}

export function saveTestPaper(paperData: PaperDataType): SaveTestPaperAction {
  return {
    type: SAVE_TEST_PAPER,
    payload: paperData,
  }
}

export interface ResetTestPageInfoAction {
  type: typeof RESET_TEST_PAGE_INFO
}

export function resetTestPageInfo(): ResetTestPageInfoAction {
  return { type: RESET_TEST_PAGE_INFO }
}

export interface ToggleExitHalfwayDialogStateAction {
  type: typeof TOGGLE_EXIT_HALFWAY_DIALOG_STATE
  payload?: boolean
}

export function toggleExitHalfwayDialogState(
  state?: boolean
): ToggleExitHalfwayDialogStateAction {
  return {
    type: TOGGLE_EXIT_HALFWAY_DIALOG_STATE,
    payload: state,
  }
}

export interface TogglePaperHasDoneFlagAction {
  type: typeof TOGGLE_PAPER_HAS_DONE_FLAG
  payload: boolean
}

export function togglePaperHasDoneFlag(
  hasDone: boolean
): TogglePaperHasDoneFlagAction {
  return { type: TOGGLE_PAPER_HAS_DONE_FLAG, payload: hasDone }
}

export interface UpdateSpentTimeAction {
  type: typeof UDPATE_SPENT_TIME
  payload: string
}

export function updateSpentTime(updatedTime: string): UpdateSpentTimeAction {
  return {
    type: UDPATE_SPENT_TIME,
    payload: updatedTime,
  }
}

export interface ToggleTimerPauseStateAction {
  type: typeof TOGGLE_TIMER_PAUSE_STATE
  payload?: boolean
}

export function toggleTimerPauseState(
  pause?: boolean
): ToggleTimerPauseStateAction {
  return { type: TOGGLE_TIMER_PAUSE_STATE, payload: pause }
}

export interface ChangeCurrentTabPanelAction {
  type: typeof CHANGE_CURRENT_TAB_PANEL
  payload: number
}

export function changeCurrentTabPanel(
  panelIndex: number
): ChangeCurrentTabPanelAction {
  return {
    type: CHANGE_CURRENT_TAB_PANEL,
    payload: panelIndex,
  }
}

export interface UpdateUserAnswersAction {
  type: typeof UPDATE_USER_ANSWERS
  payload: {
    questionId: number
    questionType: Type
    answer: string
  }
}

export function updateUserAnswers(
  questionId: number,
  questionType: Type,
  answer: string
): UpdateUserAnswersAction {
  return {
    type: UPDATE_USER_ANSWERS,
    payload: {
      questionId,
      questionType,
      answer,
    },
  }
}

export interface SyncTempTestInfoAction {
  type: typeof SYNC_TEMP_TEST_INFO
  payload: TempTestInfoType
}

export function syncTempTestInfo(
  tempTestInfo: TempTestInfoType
): SyncTempTestInfoAction {
  return {
    type: SYNC_TEMP_TEST_INFO,
    payload: tempTestInfo,
  }
}

export interface ToggleAnswerCardAction {
  type: typeof TOGGLE_ANSWER_CARD
  payload?: boolean
}

export function toggleAnswerCard(
  shouldDisplay?: boolean
): ToggleAnswerCardAction {
  return {
    type: TOGGLE_ANSWER_CARD,
    payload: shouldDisplay,
  }
}

export interface ChangePaperSubmitStatusAction {
  type: typeof CHANGE_PAPER_SUBMIT_STATUS
  payload: Status
}

export function changePaperSubmitStatus(
  status: Status
): ChangePaperSubmitStatusAction {
  return {
    type: CHANGE_PAPER_SUBMIT_STATUS,
    payload: status,
  }
}

export interface ToggleRetrySubmitDialogAction {
  type: typeof TOGGLE_RETRY_SUBMIT_DIALOG
  payload?: boolean
}

export function toggleRetrySubmitDialog(
  state?: boolean
): ToggleRetrySubmitDialogAction {
  return { type: TOGGLE_RETRY_SUBMIT_DIALOG, payload: state }
}

export interface TogglePaperHasDoneDialogAction {
  type: typeof TOGGLE_PAPER_HAS_DONE_DIALOG
  payload?: boolean
}

export function togglePaperHasDoneDialog(
  state?: boolean
): TogglePaperHasDoneDialogAction {
  return { type: TOGGLE_PAPER_HAS_DONE_DIALOG, payload: state }
}

export interface ToggleRetrySaveTempDialogAction {
  type: typeof TOGGLE_RETRY_SAVE_TEMP_DIALOG
  payload?: boolean
}

export function toggleRetrySaveTempDialog(
  state?: boolean
): ToggleRetrySaveTempDialogAction {
  return { type: TOGGLE_RETRY_SAVE_TEMP_DIALOG, payload: state }
}

export interface ChangeTempTestInfoSavingStatusAction {
  type: typeof CHANGE_TEMP_TEST_INFO_SAVING_STATUS
  payload: Status
}

export function changeTempTestInfoSavingStatus(
  status: Status
): ChangeTempTestInfoSavingStatusAction {
  return { type: CHANGE_TEMP_TEST_INFO_SAVING_STATUS, payload: status }
}

export interface ToggleShouldExitAnywayAction {
  type: typeof TOGGLE_SHOULD_EXIT_ANYWAY
  payload?: boolean
}

export function toggleShouldExitAnyway(
  state?: boolean
): ToggleShouldExitAnywayAction {
  return { type: TOGGLE_SHOULD_EXIT_ANYWAY, payload: state }
}

// ====================
// ACTION TYPES
// ====================
export type TestPageActions =
  | ChangeTestPaperFetchingStatusAction
  | SaveTestPaperAction
  | ResetTestPageInfoAction
  | ToggleExitHalfwayDialogStateAction
  | TogglePaperHasDoneFlagAction
  | UpdateSpentTimeAction
  | ToggleTimerPauseStateAction
  | ChangeCurrentTabPanelAction
  | UpdateUserAnswersAction
  | SyncTempTestInfoAction
  | ToggleAnswerCardAction
  | ChangePaperSubmitStatusAction
  | ToggleRetrySubmitDialogAction
  | TogglePaperHasDoneDialogAction
  | ToggleRetrySaveTempDialogAction
  | ChangeTempTestInfoSavingStatusAction
  | ToggleShouldExitAnywayAction

// ====================
// SAGAS
// ====================
export const SAGA_FETCH_TEST_PAPER = 'SAGA_FETCH_TEST_PAPER'
export const SAGA_CANCEL_FETCH_TEST_PAPER = 'SAGA_CANCEL_FETCH_TEST_PAPER'
export const SAGA_SAVE_TEMP_TEST_INFO_TO_LOCAL =
  'SAGA_SAVE_TEMP_TEST_INFO_TO_LOCAL'
export const SAGA_LOAD_TEMP_TEST_INFO_FROM_LOCAL =
  'SAGA_LOAD_TEMP_TEST_INFO_FROM_LOCAL'
export const SAGA_REMOVE_TEMP_TEST_INFO_FROM_LOCAL =
  'SAGA_REMOVE_TEMP_TEST_INFO_FROM_LOCAL'
export const SAGA_SUBMIT_PAPER = 'SAGA_SUBMIT_PAPER'
export const SAGA_SAVE_TEMP_TEST_INFO_TO_SERVER =
  'SAGA_SAVE_TEMP_TEST_INFO_TO_SERVER'

// fetching test paper
export interface SagaFetchTestPaperAction {
  type: typeof SAGA_FETCH_TEST_PAPER
  payload: string
}

export function sagaFetchTestPaper(testId: string): SagaFetchTestPaperAction {
  return { type: SAGA_FETCH_TEST_PAPER, payload: testId }
}

// cancel fetching test paper
export interface SagaCancelFetchTestPaperAction {
  type: typeof SAGA_CANCEL_FETCH_TEST_PAPER
}

export function sagaCancelFetchTestPaper(): SagaCancelFetchTestPaperAction {
  return { type: SAGA_CANCEL_FETCH_TEST_PAPER }
}

// save temp testInfo to local
export interface SagaSaveTempTestInfoToLocalAction {
  type: typeof SAGA_SAVE_TEMP_TEST_INFO_TO_LOCAL
}

export function sagaSaveTempTestInfoToLocal(): SagaSaveTempTestInfoToLocalAction {
  return { type: SAGA_SAVE_TEMP_TEST_INFO_TO_LOCAL }
}

// load temp testInfo from local
export interface SagaLoadTempTestInfoFromLocalAction {
  type: typeof SAGA_LOAD_TEMP_TEST_INFO_FROM_LOCAL
}

export function sagaLoadTempTestInfoFromLocal(): SagaLoadTempTestInfoFromLocalAction {
  return { type: SAGA_LOAD_TEMP_TEST_INFO_FROM_LOCAL }
}

// remove tempTestInfo from local
export interface SagaRemoveTempTestInfoFromLocalAction {
  type: typeof SAGA_REMOVE_TEMP_TEST_INFO_FROM_LOCAL
}

export function sagaRemoveTempTestInfoFromLocal(): SagaRemoveTempTestInfoFromLocalAction {
  return { type: SAGA_REMOVE_TEMP_TEST_INFO_FROM_LOCAL }
}

// submit paper
export interface SagaSubmitPaperAction {
  type: typeof SAGA_SUBMIT_PAPER
}

export function sagaSubmitPaper(): SagaSubmitPaperAction {
  return { type: SAGA_SUBMIT_PAPER }
}

// save temp testInfo to server
export interface SagaSaveTempTestInfoToServerAction {
  type: typeof SAGA_SAVE_TEMP_TEST_INFO_TO_SERVER
}

export function sagaSaveTempTestInfoToServer(): SagaSaveTempTestInfoToServerAction {
  return { type: SAGA_SAVE_TEMP_TEST_INFO_TO_SERVER }
}
