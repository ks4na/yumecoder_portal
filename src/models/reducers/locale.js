import { getLocale } from '../../locales/index.js'
import { SET_LOCALE } from '../actions/locale.js'

const initState = getLocale()

export default function localeReducer(state = initState, action) {
  switch (action.type) {
    case SET_LOCALE:
      return action.payload
    default:
      return state
  }
}
