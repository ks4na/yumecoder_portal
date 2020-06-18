import { Status } from '../status'
import {
  ShortcutListCountActions,
  CHANGE_SHORTCUTLIST_COUNT_STATUS,
  SAVE_SHORTCUTLIST_COUNT_DATA,
  RESET_SHORTCUTLIST_COUNT_STATE,
} from '../../actions'

export interface ShortcutListCountState {
  status: Status
  data?: ShortcutListCountData
}

export interface ShortcutListCountData {
  history: {
    count: number
  }
  mistakes: {
    count: number
  }
  collection: {
    count: number
  }
}

const initState: ShortcutListCountState = {
  status: Status.INITIAL,
}

export default function ShortcutListCountReducer(
  state = initState,
  action: ShortcutListCountActions
): ShortcutListCountState {
  switch (action.type) {
    case CHANGE_SHORTCUTLIST_COUNT_STATUS:
      return { ...state, status: action.payload }
    case SAVE_SHORTCUTLIST_COUNT_DATA:
      return { ...state, data: action.payload }
    case RESET_SHORTCUTLIST_COUNT_STATE:
      return initState
    default:
      return state
  }
}
