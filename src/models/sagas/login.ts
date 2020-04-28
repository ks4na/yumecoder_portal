import { takeLatest, call, put, all, select } from 'redux-saga/effects'
import {
  SagaUserLoginAction,
  SAGA_USER_LOGIN,
  setLoggingInStatus,
  setLoginSuccessStatus,
  setLoginFailedStatus,
  sagaSaveTokensToLocal,
  SagaGithubLoginAction,
  SAGA_GITHUB_LOGIN,
  setGithubLoggingInStatus,
  setGithubLoginSuccessStatus,
  setGithubLoginFailedStatus,
  addSnackbarItem,
  addAxiosErrSnackbarItem,
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
    if (data.code !== 0) {
      // 接口返回的错误信息
      yield put(setLoginFailedStatus())
      // 添加 Snackbar 提示信息
      yield put(
        addSnackbarItem({
          message: data.msg,
        })
      )
    } else {
      // 先保存 tokens， 然后设置登录状态为 SUCCESS
      const { refresh_token: refreshToken, access_token: accessToken } = data
      yield put(sagaSaveTokensToLocal({ accessToken, refreshToken }))
      yield put(setLoginSuccessStatus())
    }
  } catch (err) {
    // 预期外的错误
    yield put(setLoginFailedStatus())
    // 添加 Snackbar 提示信息
    yield put(addAxiosErrSnackbarItem(err))
  }
}

function* watchSagaUserLogin(): Generator {
  yield takeLatest(SAGA_USER_LOGIN, userLogin)
}

function* githubLogin(action: SagaGithubLoginAction): Generator {
  const { code } = action.payload
  try {
    yield put(setGithubLoggingInStatus())
    const response = (yield call(Api.handleGithubLogin, code)) as AxiosResponse<
      Api.GithubLoginReturnType
    >
    const githubLoginStatus = yield select(
      ({ loginState }) => loginState.githubLoginStatus
    )
    // 如果 LoginStatus 不为 LOGGINGIN (如：请求完成前就离开了登录页面)，则不保存这次请求的返回信息
    if (githubLoginStatus !== LoginStatus.LOGGINGIN) {
      return
    }
    const data = response.data
    if (data.code !== 0) {
      // 接口返回的错误信息
      yield put(setGithubLoginFailedStatus())
      // 添加 Snackbar 提示信息
      yield put(
        addSnackbarItem({
          message: data.msg,
        })
      )
    } else {
      // 先保存 tokens， 然后设置登录状态为 SUCCESS
      const { refresh_token: refreshToken, access_token: accessToken } = data
      yield put(sagaSaveTokensToLocal({ accessToken, refreshToken }))
      yield put(setGithubLoginSuccessStatus())
    }
  } catch (err) {
    // 预期外的错误
    yield put(setGithubLoginFailedStatus())
    // 添加 Snackbar 提示信息
    yield put(addAxiosErrSnackbarItem(err))
  }
}

function* watchSagaGithubLogin(): Generator {
  yield takeLatest(SAGA_GITHUB_LOGIN, githubLogin)
}

export default function* userSaga(): Generator {
  yield all([watchSagaUserLogin(), watchSagaGithubLogin()])
}
