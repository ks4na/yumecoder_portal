import {
  CHANGE_LOGOUT_STATUS,
  RESET_LOGOUT_STATUS,
  LogoutActions,
} from '../actions'
import { Status } from './status'

export interface LogoutState {
  status: Status
}

const initState: LogoutState = {
  status: Status.INITIAL,
}

export default function logoutReducer(
  state = initState,
  action: LogoutActions
): LogoutState {
  switch (action.type) {
    case CHANGE_LOGOUT_STATUS:
      return { ...state, status: action.payload }
    case RESET_LOGOUT_STATUS:
      return { ...state, status: Status.INITIAL }
    default:
      return state
  }
}
