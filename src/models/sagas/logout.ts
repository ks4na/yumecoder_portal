import { all, takeLatest, call, put, cancelled } from 'redux-saga/effects'
import {
  SAGA_REQUEST_LOGOUT,
  changeLogoutStatus,
  resetLogoutStatus,
  sagaClearTokens,
} from '../actions'
import { Status } from '../reducers/status'
import * as Api from '../apis'
import AxiosErrorMsgHandler from '../../containers/AxiosErrorMsgHandler'

export function* handleRequestLogout(): Generator {
  try {
    yield put(changeLogoutStatus(Status.PROGRESSING))

    yield call(Api.handleRequestLogout)

    yield put(changeLogoutStatus(Status.SUCCESS))

    // 清除保存在本地的 tokens
    yield put(sagaClearTokens())
  } catch (err) {
    yield put(changeLogoutStatus(Status.FAILED))
    yield put(AxiosErrorMsgHandler(err))
  } finally {
    if (yield cancelled()) {
      yield put(changeLogoutStatus(Status.CANCELLED))
    }
    // 重置为 INITIAL
    yield put(resetLogoutStatus())
  }
}

export function* watchSagaRequestLogout(): Generator {
  yield takeLatest(SAGA_REQUEST_LOGOUT, handleRequestLogout)
}

export default function* LogoutSaga(): Generator {
  yield all([watchSagaRequestLogout()])
}
