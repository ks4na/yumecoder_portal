import { getLocale, LocaleKey } from '../../locales'
import { LocaleActions, SET_LOCALE } from '../actions'

export interface LocaleState {
  locale: LocaleKey
}
const initState: LocaleState = {
  locale: getLocale(),
}

export default function localeReducer(
  state = initState,
  action: LocaleActions
): LocaleState {
  switch (action.type) {
    case SET_LOCALE:
      return { ...state, locale: action.payload }
    default:
      return state
  }
}
