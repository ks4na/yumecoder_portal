import {
  PwdResetActions,
  CHANGE_PWD_RESET_EMAIL_VALIDATE_STATUS,
  RESET_PWD_RESET_EMAIL_VALIDATE_STATUS,
  CHANGE_PWD_RESET_STATUS,
  RESET_PWD_RESET_STATUS,
} from '../actions'
import { Status } from './status'

export interface PwdResetState {
  emailValidateStatus: Status
  pwdResetStatus: Status
  showProgressbar: boolean
}

const initState: PwdResetState = {
  emailValidateStatus: Status.INITIAL,
  pwdResetStatus: Status.INITIAL,
  showProgressbar: false,
}

export default function pwdResetReducer(
  state = initState,
  action: PwdResetActions
): PwdResetState {
  switch (action.type) {
    // email validate
    case CHANGE_PWD_RESET_EMAIL_VALIDATE_STATUS:
      return {
        ...state,
        emailValidateStatus: action.payload,
        showProgressbar: action.payload === Status.PROGRESSING ? true : false,
      }
    case RESET_PWD_RESET_EMAIL_VALIDATE_STATUS:
      return {
        ...state,
        emailValidateStatus: Status.INITIAL,
      }
    // pwd reset
    case CHANGE_PWD_RESET_STATUS:
      return {
        ...state,
        pwdResetStatus: action.payload,
        showProgressbar: action.payload === Status.PROGRESSING ? true : false,
      }
    case RESET_PWD_RESET_STATUS:
      return {
        ...state,
        pwdResetStatus: Status.INITIAL,
      }
    default:
      return state
  }
}
