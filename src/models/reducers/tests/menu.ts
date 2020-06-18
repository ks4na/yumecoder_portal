import { Status } from '../status'
import {
  TestMenuActions,
  CHANGE_TEST_MENU_STATUS,
  SAVE_TEST_MENU_DATA,
  RESET_TEST_MENU_STATE,
  CHANGE_TEMP_TEST_ID,
} from '../../actions'

export interface User {
  id: number
  nickname: string
  avatar: string
  exerciseDays: number
  personalSignature: string
}

export interface CategoryItem {
  id: number
  categoryName: string
  questionAmount: number
  userDoneAmount?: number
  userRightAmount?: number
  children?: CategoryItem[]
}

export interface TestMenuData {
  user: User
  categories: CategoryItem[]
  userDoneQuestionTotal: number
  userRightQuestionTotal: number
}

export interface TestMenuState {
  status: Status
  data?: TestMenuData
  tempTestId?: number
}

const initState: TestMenuState = {
  status: Status.INITIAL,
}

export default function testMenuReducer(
  state = initState,
  action: TestMenuActions
): TestMenuState {
  switch (action.type) {
    case CHANGE_TEST_MENU_STATUS:
      return { ...state, status: action.payload }
    case SAVE_TEST_MENU_DATA:
      return { ...state, data: action.payload }
    case CHANGE_TEMP_TEST_ID: {
      return {
        ...state,
        tempTestId: action.payload,
      }
    }
    case RESET_TEST_MENU_STATE:
      return initState
    default:
      return state
  }
}
