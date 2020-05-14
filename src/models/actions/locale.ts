import { LocaleKey } from '../../locales'

export const SET_LOCALE = 'SET_LOCALE'
export type SET_LOCALE = typeof SET_LOCALE

export interface SetLocaleAction {
  type: SET_LOCALE
  payload: LocaleKey
}

export function setLocale(locale: LocaleKey): SetLocaleAction {
  return {
    type: SET_LOCALE,
    payload: locale,
  }
}

export type LocaleActions = SetLocaleAction

/////////////
//  sagas
/////////////

export const SAGA_CHANGE_LOCALE = 'SAGA_CHANGE_LOCALE'
export type SAGA_CHANGE_LOCALE = typeof SAGA_CHANGE_LOCALE

export interface SagaChangeLocaleAction {
  type: SAGA_CHANGE_LOCALE
  payload: LocaleKey
}

export function sagaChangeLocale(locale: LocaleKey): SagaChangeLocaleAction {
  return {
    type: SAGA_CHANGE_LOCALE,
    payload: locale,
  }
}
