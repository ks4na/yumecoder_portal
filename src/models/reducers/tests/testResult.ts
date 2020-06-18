import {
  TestResultActions,
  CHANGE_TEST_RESULT_REQUEST_STATUS,
  SAVE_TEST_RESULT,
  RESET_TEST_RESULT_STATE,
} from '../../actions'
import { Status } from '../status'

export interface TestResultData {
  id: number
  testName: string
  questionAmount: number
  correctAmount: number
  spentTime: string
  questions: {
    id: number
    isRight: boolean
  }[]
}

export interface TestResultState {
  status: Status
  data?: TestResultData
}

const initState: TestResultState = {
  status: Status.INITIAL,
}

export default function testResultReducer(
  state = initState,
  action: TestResultActions
): TestResultState {
  switch (action.type) {
    case CHANGE_TEST_RESULT_REQUEST_STATUS: {
      return {
        ...state,
        status: action.payload,
      }
    }
    case SAVE_TEST_RESULT: {
      return {
        ...state,
        data: action.payload,
      }
    }
    case RESET_TEST_RESULT_STATE: {
      return initState
    }
    default: {
      return state
    }
  }
}
