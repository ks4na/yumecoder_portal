import { takeLatest, call, put, all, select } from 'redux-saga/effects'
import {
  SagaUserLoginAction,
  SAGA_USER_LOGIN,
  setLoggingInStatus,
  setLoginSuccessStatus,
  setLoginFailedStatus,
  sagaSaveTokensToLocal,
} from '../actions'
import { LoginStatus } from '../reducers/login'
import * as Api from '../apis'
import { AxiosResponse } from 'axios'

function* userLogin(action: SagaUserLoginAction): Generator {
  const loginInfo = action.payload
  try {
    yield put(setLoggingInStatus())
    const response = (yield call(
      Api.handleUserLogin,
      loginInfo
    )) as AxiosResponse<Api.UserLoginReturnType>
    const loginStatus = yield select(({ loginState }) => loginState.status)
    // 如果 LoginStatus 不为 LOGGINGIN (如：请求完成前就离开了登录页面)，则不保存这次请求的返回信息
    if (loginStatus !== LoginStatus.LOGGINGIN) {
      return
    }
    const data = response.data
    if (typeof data.code !== 'number') {
      // 不正确的请求返回的数据
      console.error(response.data)
      yield put(setLoginFailedStatus(''))
    } else {
      if (data.code !== 0) {
        // 后台返回的错误信息
        yield put(setLoginFailedStatus(data.msg || ''))
      } else {
        // 先保存 tokens， 然后设置登录状态为 SUCCESS
        const { refresh_token: refreshToken, access_token: accessToken } = data
        yield put(sagaSaveTokensToLocal({ accessToken, refreshToken }))
        yield put(setLoginSuccessStatus())
      }
    }
  } catch (err) {
    // 预期外的错误（ajax请求出错等）
    yield put(setLoginFailedStatus(''))
    console.error(err)
  }
}

function* watchSagaUserLogin(): Generator {
  yield takeLatest(SAGA_USER_LOGIN, userLogin)
}

export default function* userSaga(): Generator {
  yield all([watchSagaUserLogin()])
}
