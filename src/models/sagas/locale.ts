import { takeEvery, all, put } from 'redux-saga/effects'
import {
  SAGA_CHANGE_LOCALE,
  setLocale,
  SagaChangeLocaleAction,
} from '../actions'
import { saveLocaleToLocalStorage, getLocale } from '../../locales'

export function* watchSagaChangeLocale() {
  yield takeEvery(SAGA_CHANGE_LOCALE, changeLocale)
}

export function* changeLocale(action: SagaChangeLocaleAction) {
  const locale = getLocale(action.payload)
  // 更新 <html> 标签的 lang 属性
  const htmlEle = document.querySelector('html')
  if (htmlEle) {
    htmlEle.lang = locale
  }
  // 保存到 storage
  saveLocaleToLocalStorage(locale)

  yield put(setLocale(locale))
}

export default function* localeSaga() {
  yield all([watchSagaChangeLocale()])
}
