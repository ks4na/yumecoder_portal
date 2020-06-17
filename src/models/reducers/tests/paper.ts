import { PaperActions, CHANGE_PREPAREPAPER_STATUS } from '../../actions'
import { Status } from '../status'

export interface PaperState {
  preparePaperStatus: Status
}

const initState: PaperState = {
  preparePaperStatus: Status.INITIAL,
}

export default function paperReducer(
  state = initState,
  action: PaperActions
): PaperState {
  switch (action.type) {
    case CHANGE_PREPAREPAPER_STATUS:
      return { ...state, preparePaperStatus: action.payload }
    default:
      return state
  }
}
