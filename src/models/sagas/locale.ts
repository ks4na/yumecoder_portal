import { takeEvery, all, put } from 'redux-saga/effects'
import {
  SAGA_CHANGE_LOCALE,
  setLocale,
  SagaChangeLocaleAction,
} from '../actions'
import { saveLocaleToLocalStorage, getLocale } from '../../locales'

export function* changeLocale(action: SagaChangeLocaleAction): Generator {
  const locale = getLocale(action.payload)
  // 更新 <html> 标签的 lang 属性
  // eslint-disable-next-line compat/compat
  const htmlEle = document.querySelector('html')
  if (htmlEle) {
    htmlEle.lang = locale
  }
  // 保存到 storage
  saveLocaleToLocalStorage(locale)

  yield put(setLocale(locale))
}

export function* watchSagaChangeLocale(): Generator {
  yield takeEvery(SAGA_CHANGE_LOCALE, changeLocale)
}

export default function* localeSaga(): Generator {
  yield all([watchSagaChangeLocale()])
}
