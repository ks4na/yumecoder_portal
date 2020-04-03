import { takeEvery, all, put, call } from 'redux-saga/effects'
import {
  SAGA_SAVE_TYPE_TO_LOCAL,
  SagaSaveTypeToLocalAction,
  alterThemeType,
} from '../actions'

function* saveTypeToLocal(action: SagaSaveTypeToLocalAction): Generator {
  const themeType = action.payload
  yield call(localStorage.setItem, 'themeType', themeType)
  yield put(alterThemeType(themeType))
}
function* watchSagaSaveTypeToLocal(): Generator {
  yield takeEvery(SAGA_SAVE_TYPE_TO_LOCAL, saveTypeToLocal)
}

export default function* themeSaga(): Generator {
  yield all([watchSagaSaveTypeToLocal()])
}
