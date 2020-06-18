import { Status } from './status'
import {
  UserActions,
  CHAGNE_USER_STATE_STATUS,
  SAVE_USER_DATA,
  RESET_USER_STATE,
  CHANGE_USER_DATA_UPDATE_STATUS,
  UPDATE_USER_DATA,
} from '../actions'

export interface UserInfo {
  id: number
  nickname: string
  avatar: string
  personalSignature: string
  gender: number
  exerciseDays: number
  follows: number
  followers: number
  credits: number
  doneQuestionNumber: number
  testRange: number
  questionNumberPerTime: number
  [prop: string]: unknown
}

export interface UserState {
  status: Status
  data?: UserInfo
  userDataUpdateStatus: Status
}

const initState: UserState = {
  status: Status.INITIAL,
  userDataUpdateStatus: Status.INITIAL,
}

export default function userReducer(
  state = initState,
  action: UserActions
): UserState {
  switch (action.type) {
    case CHAGNE_USER_STATE_STATUS:
      return { ...state, status: action.payload }
    case SAVE_USER_DATA:
      return { ...state, data: action.payload }
    case RESET_USER_STATE:
      return initState
    case CHANGE_USER_DATA_UPDATE_STATUS:
      return { ...state, userDataUpdateStatus: action.payload }
    case UPDATE_USER_DATA:
      return {
        ...state,
        data: state.data && { ...state.data, ...action.payload },
      }
    default:
      return state
  }
}
