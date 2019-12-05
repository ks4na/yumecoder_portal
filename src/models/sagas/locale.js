import { takeEvery, all, put } from 'redux-saga/effects'
import { CHANGE_LOCALE, setLocale } from '../actions/locale.js'
import { saveLocale } from '../../locales/index.js'

export function* watchChangeLocale() {
  yield takeEvery(CHANGE_LOCALE, changeLocale)
}

export function* changeLocale(action) {
  const locale = action.payload
  // 更新网页的<html>标签的lang属性
  document.querySelector('html').lang = locale
  // 保存到storage
  saveLocale(locale)

  yield put(setLocale(locale))
}

export default function* localeSaga() {
  yield all([watchChangeLocale()])
}
