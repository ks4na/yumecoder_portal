export const SET_LOCALE = 'SET_LOCALE'
export const CHANGE_LOCALE = 'CHANGE_LOCALE'

export function changeLocale(locale) {
  return {
    type: CHANGE_LOCALE,
    payload: locale
  }
}

export function setLocale(locale) {
  return {
    type: SET_LOCALE,
    payload: locale
  }
}
