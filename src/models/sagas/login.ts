import {
  takeLatest,
  call,
  put,
  all,
  select,
  take,
  fork,
  cancel,
  cancelled,
} from 'redux-saga/effects'
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
  SAGA_REQUEST_QQ_LOGIN,
  SAGA_CANCEL_QQ_LOGIN,
  SagaRequestQQLoginAction,
  changeQQLoginStatus,
} from '../actions'
import { LoginStatus } from '../reducers/login'
import * as Api from '../apis'
import { AxiosResponse } from 'axios'
import { Action } from 'redux'
import { Task } from 'redux-saga'

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

// handle QQ login
function* requestQQLogin(action: SagaRequestQQLoginAction): Generator {
  try {
    const { openId, nickname, avatar, gender } = action.payload
    // 更改 请求状态 为 请求中
    yield put(changeQQLoginStatus(LoginStatus.LOGGINGIN))

    // 发送异步请求
    const response = (yield call(Api.handleQQLogin, {
      openId,
      nickname,
      avatar,
      gender,
    })) as AxiosResponse<Api.QQLoginReturnType>

    const { data } = response

    if (data.code !== 0) {
      // 从api接口返回的错误信息
      yield put(changeQQLoginStatus(LoginStatus.FAILED))
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
      yield put(changeQQLoginStatus(LoginStatus.SUCCESS))
    }
  } catch (err) {
    // 请求发生错误
    yield put(changeQQLoginStatus(LoginStatus.FAILED))
    // 添加 Snackbar 提示信息
    yield put(addAxiosErrSnackbarItem(err))
  } finally {
    if (yield cancelled()) {
      // 取消请求
      yield put(changeQQLoginStatus(LoginStatus.CANCELLED))
    } else {
      // 请求已完成（非取消状态）
      yield put({ type: 'SAGA_QQ_LOGIN_FINISHED' })
    }
  }
}

function* watchSagaRequestQQLogin(): Generator {
  while (true) {
    const action = yield take(SAGA_REQUEST_QQ_LOGIN)

    const task = (yield fork<typeof requestQQLogin>(
      requestQQLogin,
      action as SagaRequestQQLoginAction
    )) as Task

    // 等待 CANCEL Action / DONE Action
    const laterAction = (yield take([
      SAGA_CANCEL_QQ_LOGIN,
      'SAGA_QQ_LOGIN_FINISHED',
    ])) as Action
    // 如果是 CANCEL Action
    if (laterAction.type === SAGA_CANCEL_QQ_LOGIN) {
      yield cancel(task)
    }
  }
}

export default function* userSaga(): Generator {
  yield all([
    watchSagaUserLogin(),
    watchSagaGithubLogin(),
    watchSagaRequestQQLogin(),
  ])
}
