import {
  RegistActions,
  CHANGE_REGIST_STATUS,
  CHANGE_EMAIL_CHECK_STATUS,
  CHANGE_EMAIL_USED_STATUS,
  SAVE_EMAIL_USED_STATUS,
  RESET_ALL_EMAIL_STATUS,
  CHANGE_ACTIVATE_STATUS,
} from '../actions'

export enum RegistStatus {
  INITIAL,
  PROGRESSING,
  SUCCESS,
  FAILED,
  CANCELLED,
}

export enum EmailCheckStatus {
  INITIAL,
  PROGRESSING,
  SUCCESS,
  FAILED,
  CANCELLED,
}

export enum EmailUsedStatus {
  UNKNOWN,
  USED,
  UNUSED,
}

export enum ActivateStatus {
  INITIAL,
  PROGRESSING,
  SUCCESS,
  FAILED,
  CANCELLED,
}

export interface RegistState {
  status: RegistStatus
  showProgressbar: boolean
  emailCheckStatus: EmailCheckStatus
  emailUsedStatus: EmailUsedStatus
  activateStatus: ActivateStatus
}

const initState: RegistState = {
  status: RegistStatus.INITIAL,
  showProgressbar: false,
  emailCheckStatus: EmailCheckStatus.INITIAL,
  emailUsedStatus: EmailUsedStatus.UNKNOWN,
  activateStatus: ActivateStatus.INITIAL,
}

export default function registReducer(
  state = initState,
  action: RegistActions
): RegistState {
  switch (action.type) {
    case CHANGE_REGIST_STATUS:
      return {
        ...state,
        status: action.payload,
        showProgressbar:
          action.payload === RegistStatus.PROGRESSING ? true : false,
      }
    case CHANGE_EMAIL_CHECK_STATUS:
      return {
        ...state,
        emailCheckStatus: action.payload,
      }
    case CHANGE_EMAIL_USED_STATUS:
      return {
        ...state,
        emailUsedStatus: action.payload,
      }
    case SAVE_EMAIL_USED_STATUS:
      return {
        ...state,
        emailCheckStatus: EmailCheckStatus.SUCCESS,
        emailUsedStatus: action.payload,
      }
    case RESET_ALL_EMAIL_STATUS:
      return {
        ...state,
        emailCheckStatus: EmailCheckStatus.INITIAL,
        emailUsedStatus: EmailUsedStatus.UNKNOWN,
      }
    case CHANGE_ACTIVATE_STATUS:
      return {
        ...state,
        activateStatus: action.payload,
        showProgressbar:
          action.payload === ActivateStatus.PROGRESSING ? true : false,
      }
    default:
      return state
  }
}
