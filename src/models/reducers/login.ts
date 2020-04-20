import {
  LOGIN_STATUS_LOGGINGIN,
  LOGIN_STATUS_SUCCESS,
  LOGIN_STATUS_FAILED,
  LOGIN_STATUS_CANCELLED,
  LOGIN_STATUS_RESET,
  LoginActions,
} from '../actions'

export enum LoginStatus {
  INITIAL,
  LOGGINGIN,
  SUCCESS,
  FAILED,
  CANCELLED,
}

export interface LoginState {
  status: LoginStatus
  msg: string
}

const initialState: LoginState = {
  status: LoginStatus.INITIAL,
  msg: '',
}

export default function loginReducer(
  state = initialState,
  action: LoginActions
): LoginState {
  switch (action.type) {
    case LOGIN_STATUS_LOGGINGIN:
      return { ...state, status: LoginStatus.LOGGINGIN, msg: '' }
    case LOGIN_STATUS_SUCCESS:
      return { ...state, status: LoginStatus.SUCCESS, msg: '' }
    case LOGIN_STATUS_FAILED:
      return { ...state, status: LoginStatus.FAILED, msg: action.payload }
    case LOGIN_STATUS_CANCELLED:
      return { ...state, status: LoginStatus.CANCELLED, msg: '' }
    case LOGIN_STATUS_RESET:
      return initialState
    default:
      return state
  }
}
