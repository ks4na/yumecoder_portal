import { Status } from '../status'
import {
  TestAnalysisActions,
  CHANGE_TEST_ANALYSIS_REQUEST_STATUS,
  SAVE_TEST_ANALYSIS_DATA,
  RESET_TEST_ANALYSIS_STATE,
  CHANGE_TEST_ANALYSIS_PAGE_TAB_INDEX,
  TOGGLE_ONLY_SHOW_MISTAKE_STATE,
} from '../../actions'

export enum AnalysisDataQuestionType {
  SINGLE = 0,
  MULTI,
}

export enum AnalysisDataQuestionDeleteStatus {
  NOT_DELETED = 0,
  DELETED,
}

export enum AnalysisDataQuestionCollectStatus {
  NOT_COLLECTED = 0,
  COLLECTED,
}

export interface AnalysisDataOption {
  id: number
  content: string
}

export interface AnalysisDataQuestion {
  id: number
  type: AnalysisDataQuestionType
  question: string
  options: AnalysisDataOption[]
  answer: string[]
  userAnswer: string[]
  knowledgeTag: string
  analysis: string
  isDeleted: AnalysisDataQuestionDeleteStatus
  isCollected: AnalysisDataQuestionCollectStatus
}

export interface TestAnalysisDataType {
  id: number
  testName: string
  questionAmount: number
  correctAmount: number
  spentTime: string
  creater: number
  questions: AnalysisDataQuestion[]
}

export interface TestAnalysisState {
  status: Status
  data?: TestAnalysisDataType
  tabIndex: number
  onlyShowMistake: boolean
}

const initState: TestAnalysisState = {
  status: Status.INITIAL,
  tabIndex: 0,
  onlyShowMistake: false,
}

export default function testAnalysisReducer(
  state = initState,
  action: TestAnalysisActions
): TestAnalysisState {
  switch (action.type) {
    case CHANGE_TEST_ANALYSIS_REQUEST_STATUS:
      return { ...state, status: action.payload }
    case SAVE_TEST_ANALYSIS_DATA:
      return { ...state, data: action.payload }
    case CHANGE_TEST_ANALYSIS_PAGE_TAB_INDEX:
      return { ...state, tabIndex: action.payload }
    case TOGGLE_ONLY_SHOW_MISTAKE_STATE:
      return {
        ...state,
        onlyShowMistake: action.payload || !state.onlyShowMistake,
      }
    case RESET_TEST_ANALYSIS_STATE:
      return initState
    default:
      return state
  }
}
