import { Status } from '../status'
import {
  TestPageActions,
  CHANGE_TEST_PAPER_FETCHING_STATUS,
  SAVE_TEST_PAPER,
  RESET_TEST_PAGE_INFO,
  TOGGLE_EXIT_HALFWAY_DIALOG_STATE,
  TOGGLE_PAPER_HAS_DONE_FLAG,
  UDPATE_SPENT_TIME,
  TOGGLE_TIMER_PAUSE_STATE,
  CHANGE_CURRENT_TAB_PANEL,
  UPDATE_USER_ANSWERS,
  UpdateUserAnswersAction,
  SYNC_TEMP_TEST_INFO,
  TOGGLE_ANSWER_CARD,
  CHANGE_PAPER_SUBMIT_STATUS,
  TOGGLE_RETRY_SUBMIT_DIALOG,
  TOGGLE_PAPER_HAS_DONE_DIALOG,
  TOGGLE_RETRY_SAVE_TEMP_DIALOG,
  CHANGE_TEMP_TEST_INFO_SAVING_STATUS,
  TOGGLE_SHOULD_EXIT_ANYWAY,
} from '../../actions'

export interface PaperDataType {
  id: number
  testName: string
  questionAmount: number
  spentTime: string
  questions: QuestionType[]
  creater: number
}

export enum Type {
  SINGLE,
  MULTI,
}

export interface QuestionType {
  id: number
  type: Type
  question: string
  knowledgeTag: string
  options: OptionType[]
  userAnswer: string[]
}

export interface OptionType {
  id: number
  sort: number
  content: string
}

export interface UserAnswerType {
  questionId: number
  answer: string[]
}

export interface TestPageState {
  paperFetchingStatus: Status
  paperData?: PaperDataType
  showExitHalfwayDialog: boolean
  paperHasDone: boolean
  currentSpentTime: string
  isTimerPaused: boolean
  currentTabPanelIndex: number
  userAnswers: UserAnswerType[]
  showAnswerCard: boolean
  paperSubmitStatus: Status
  showRetrySubmitDialog: boolean
  showPaperHasDoneDialog: boolean
  tempTestInfoSavingStatus: Status
  showRetrySaveTempDialog: boolean
  shouldExitAnyway: boolean
}

const initState: TestPageState = {
  paperFetchingStatus: Status.INITIAL,
  showExitHalfwayDialog: false,
  paperHasDone: false,
  currentSpentTime: '00:00:00',
  isTimerPaused: false,
  currentTabPanelIndex: 0,
  userAnswers: [],
  showAnswerCard: false,
  paperSubmitStatus: Status.INITIAL,
  showRetrySubmitDialog: false,
  showPaperHasDoneDialog: false,
  tempTestInfoSavingStatus: Status.INITIAL,
  showRetrySaveTempDialog: false,
  shouldExitAnyway: false,
}

export default function testPageReducer(
  state = initState,
  action: TestPageActions
): TestPageState {
  switch (action.type) {
    case CHANGE_TEST_PAPER_FETCHING_STATUS:
      return { ...state, paperFetchingStatus: action.payload }
    case SAVE_TEST_PAPER:
      const paperData = action.payload
      const currentSpentTime = paperData.spentTime
      const userAnswers = paperData.questions.map(
        (item): UserAnswerType => {
          return {
            questionId: item.id,
            answer: item.userAnswer,
          }
        }
      )
      return {
        ...state,
        paperData,
        currentSpentTime,
        userAnswers,
      }
    case TOGGLE_EXIT_HALFWAY_DIALOG_STATE: {
      return {
        ...state,
        showExitHalfwayDialog: action.payload || !state.showExitHalfwayDialog,
      }
    }
    case TOGGLE_PAPER_HAS_DONE_FLAG: {
      return {
        ...state,
        paperHasDone: action.payload,
        isTimerPaused: action.payload,
      }
    }
    case UDPATE_SPENT_TIME: {
      return {
        ...state,
        currentSpentTime: action.payload,
      }
    }
    case TOGGLE_TIMER_PAUSE_STATE: {
      return { ...state, isTimerPaused: action.payload || !state.isTimerPaused }
    }
    case CHANGE_CURRENT_TAB_PANEL: {
      return { ...state, currentTabPanelIndex: action.payload }
    }
    case UPDATE_USER_ANSWERS: {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      return updateUserAnswers(state, action)
    }
    case SYNC_TEMP_TEST_INFO: {
      return {
        ...state,
        currentSpentTime: action.payload.currentSpentTime,
        currentTabPanelIndex: action.payload.currentTabPanelIndex,
        userAnswers: action.payload.userAnswers,
      }
    }
    case TOGGLE_ANSWER_CARD: {
      return {
        ...state,
        showAnswerCard: action.payload || !state.showAnswerCard,
      }
    }
    case CHANGE_PAPER_SUBMIT_STATUS: {
      return { ...state, paperSubmitStatus: action.payload }
    }
    case TOGGLE_RETRY_SUBMIT_DIALOG: {
      return {
        ...state,
        showRetrySubmitDialog: action.payload || !state.showRetrySubmitDialog,
      }
    }
    case TOGGLE_PAPER_HAS_DONE_DIALOG: {
      return {
        ...state,
        showPaperHasDoneDialog: action.payload || !state.showPaperHasDoneDialog,
      }
    }
    case CHANGE_TEMP_TEST_INFO_SAVING_STATUS: {
      return { ...state, tempTestInfoSavingStatus: action.payload }
    }
    case TOGGLE_RETRY_SAVE_TEMP_DIALOG: {
      return {
        ...state,
        showRetrySaveTempDialog:
          action.payload || !state.showRetrySaveTempDialog,
      }
    }
    case TOGGLE_SHOULD_EXIT_ANYWAY: {
      return {
        ...state,
        shouldExitAnyway: action.payload || !state.shouldExitAnyway,
      }
    }
    case RESET_TEST_PAGE_INFO:
      return initState
    default:
      return state
  }
}

/**
 * 更新用户答案
 *
 * @export
 * @param {TestPageState} state 原始的 state
 * @param {UpdateUserAnswersAction} action UpdateUserAnswersAction
 * @returns {TestPageState} 更新后的 state
 */
export function updateUserAnswers(
  state: TestPageState,
  action: UpdateUserAnswersAction
): TestPageState {
  const { questionId, questionType, answer } = action.payload
  const target = state.userAnswers.find(item => item.questionId === questionId)
  // 不存在该题的答案
  if (!target) {
    return {
      ...state,
      userAnswers: [...state.userAnswers, { questionId, answer: [answer] }],
    }
  }
  // 已存在该题的答案
  // 1. 单选题
  if (questionType === Type.SINGLE) {
    const newUserAnswers = state.userAnswers.map(item => {
      if (item.questionId !== questionId) {
        return item
      } else {
        // 已添加该选项，则移除
        if (item.answer.includes(answer)) {
          return { questionId, answer: [] }
        } else {
          // 否则添加该选项
          return { questionId, answer: [answer] }
        }
      }
    })
    return {
      ...state,
      userAnswers: newUserAnswers,
    }
  } else {
    // 2. 多选题
    const newUserAnswers = state.userAnswers.map(item => {
      if (item.questionId !== questionId) {
        return item
      } else {
        const oldAnswersSet = new Set(item.answer)
        if (oldAnswersSet.has(answer)) {
          oldAnswersSet.delete(answer)
        } else {
          oldAnswersSet.add(answer)
        }
        // 对答案数组按照字母顺序从小到大排序
        const newSortedAnswersArr = [...oldAnswersSet].sort((a, b) =>
          a < b ? -1 : 1
        )
        return { questionId, answer: newSortedAnswersArr }
      }
    })
    return { ...state, userAnswers: newUserAnswers }
  }
}
