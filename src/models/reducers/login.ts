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
  QQLoginActions,
  CHANGE_QQ_LOGIN_STATUS,
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
  qqLoginStatus: LoginStatus
}

const initialState: LoginState = {
  status: LoginStatus.INITIAL,
  githubLoginStatus: LoginStatus.INITIAL,
  qqLoginStatus: LoginStatus.INITIAL,
}

export default function loginReducer(
  state = initialState,
  action: LoginActions | GithubLoginActions | QQLoginActions
): LoginState {
  switch (action.type) {
    // common login
    case LOGIN_STATUS_LOGGINGIN:
      return { ...state, status: LoginStatus.LOGGINGIN }
    case LOGIN_STATUS_SUCCESS:
      return { ...state, status: LoginStatus.SUCCESS }
    case LOGIN_STATUS_FAILED:
      return { ...state, status: LoginStatus.FAILED }
    case LOGIN_STATUS_CANCELLED:
      return { ...state, status: LoginStatus.CANCELLED }
    case LOGIN_STATUS_RESET:
      return { ...state, status: initialState.status }
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
    // QQ login
    case CHANGE_QQ_LOGIN_STATUS:
      return { ...state, qqLoginStatus: action.payload }
    default:
      return state
  }
}
