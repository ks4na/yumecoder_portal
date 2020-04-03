import { takeEvery, all, put, call } from 'redux-saga/effects'
import {
  SAGA_SAVE_TYPE_TO_LOCAL,
  SagaSaveTypeToLocalAction,
  alterThemeType,
} from '../actions'

function* watchSagaSaveTypeToLocal() {
  yield takeEvery(SAGA_SAVE_TYPE_TO_LOCAL, saveTypeToLocal)
}

function* saveTypeToLocal(action: SagaSaveTypeToLocalAction) {
  const themeType = action.payload
  yield call(localStorage.setItem, 'themeType', themeType)
  yield put(alterThemeType(themeType))
}

export default function* themeSaga() {
  yield all([watchSagaSaveTypeToLocal()])
}
