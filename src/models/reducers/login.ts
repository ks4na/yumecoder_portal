import {
  LOGIN_STATUS_LOGGINGIN,
  LOGIN_STATUS_SUCCESS,
  LOGIN_STATUS_FAILED,
  LOGIN_STATUS_CANCELLED,
  LOGIN_STATUS_RESET,
  LoginActions,
  GITHUB_LOGIN_STATUS_LOGGINGIN,
  GITHUB_LOGIN_STATUS_SUCCESS,
  GITHUB_LOGIN_STATUS_FAILED,
  GITHUB_LOGIN_STATUS_CANCELLED,
  GITHUB_LOGIN_STATUS_RESET,
  GithubLoginActions,
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
  githubLoginStatus: LoginStatus
  msg: string
}

const initialState: LoginState = {
  status: LoginStatus.INITIAL,
  githubLoginStatus: LoginStatus.INITIAL,
  msg: '',
}

export default function loginReducer(
  state = initialState,
  action: LoginActions | GithubLoginActions
): LoginState {
  switch (action.type) {
    // common login
    case LOGIN_STATUS_LOGGINGIN:
      return { ...state, status: LoginStatus.LOGGINGIN, msg: '' }
    case LOGIN_STATUS_SUCCESS:
      return { ...state, status: LoginStatus.SUCCESS, msg: '' }
    case LOGIN_STATUS_FAILED:
      return { ...state, status: LoginStatus.FAILED, msg: action.payload }
    case LOGIN_STATUS_CANCELLED:
      return { ...state, status: LoginStatus.CANCELLED, msg: '' }
    case LOGIN_STATUS_RESET:
      return { ...state, status: initialState.status, msg: initialState.msg }
    // github login
    case GITHUB_LOGIN_STATUS_LOGGINGIN:
      return { ...state, githubLoginStatus: LoginStatus.LOGGINGIN }
    case GITHUB_LOGIN_STATUS_SUCCESS:
      return { ...state, githubLoginStatus: LoginStatus.SUCCESS }
    case GITHUB_LOGIN_STATUS_FAILED:
      return { ...state, githubLoginStatus: LoginStatus.FAILED }
    case GITHUB_LOGIN_STATUS_CANCELLED:
      return { ...state, githubLoginStatus: LoginStatus.CANCELLED }
    case GITHUB_LOGIN_STATUS_RESET:
      return { ...state, githubLoginStatus: initialState.githubLoginStatus }
    default:
      return state
  }
}
