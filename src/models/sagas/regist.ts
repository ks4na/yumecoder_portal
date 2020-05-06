import {
  take,
  cancel,
  cancelled,
  put,
  call,
  fork,
  all,
} from 'redux-saga/effects'
import { Task } from 'redux-saga'
import { Action } from 'redux'
import {
  SAGA_REQUEST_REGIST,
  SagaRequestRegistAction,
  SAGA_CANCEL_REGIST,
  changeRegistStatus,
  addSnackbarItem,
  addAxiosErrSnackbarItem,
  SAGA_REQUEST_EMAIL_CHECK,
  SagaRequestEmailCheckAction,
  SAGA_CANCEL_EMAIL_CHECK,
  changeEmailCheckStatus,
  saveEmailUsedStatus,
  SAGA_REQUEST_ACTIVATE,
  SagaRequestActivateAction,
  SAGA_CANCEL_ACTIVATE,
  changeActivateStatus,
} from '../actions'
import {
  RegistStatus,
  EmailCheckStatus,
  EmailUsedStatus,
  ActivateStatus,
} from '../reducers/regist'
import * as Api from '../apis'
import { AxiosResponse } from 'axios'
import { FormattedMessage } from 'react-intl'

function* handleRegist(action: SagaRequestRegistAction): Generator {
  try {
    const { email, password, captcha } = action.payload
    // 更新状态为 请求中
    yield put(changeRegistStatus(RegistStatus.PROGRESSING))

    const response = (yield call(Api.handleRegist, {
      email,
      password,
      captcha,
    })) as AxiosResponse<Api.RegistReturnType>

    const { data } = response
    if (data !== true) {
      // api接口返回的错误信息
      yield put(changeRegistStatus(RegistStatus.FAILED))
      yield put(addSnackbarItem({ message: data.msg }))
    } else {
      // 请求成功
      yield put(changeRegistStatus(RegistStatus.SUCCESS))
    }
  } catch (err) {
    // api接口预期外的错误
    yield put(changeRegistStatus(RegistStatus.FAILED))
    yield put(addAxiosErrSnackbarItem(err))
  } finally {
    // 如果是 取消saga
    if (yield cancelled()) {
      yield put(changeRegistStatus(RegistStatus.CANCELLED))
    } else {
      // 请求完成（非取消）
      yield put({ type: 'SAGA_REQUEST_REGIST_FINISHED' })
    }
  }
}

function* watchSagaRequestRegist(): Generator {
  while (true) {
    const action = (yield take(SAGA_REQUEST_REGIST)) as SagaRequestRegistAction
    const task = (yield fork(handleRegist, action)) as Task

    const resultAction = (yield take([
      SAGA_CANCEL_REGIST,
      'SAGA_REQUEST_REGIST_FINISHED',
    ])) as Action
    if (resultAction.type === SAGA_CANCEL_REGIST) {
      yield cancel(task)
    }
  }
}

function* handleEmailCheck(action: SagaRequestEmailCheckAction): Generator {
  try {
    const email = action.payload

    // 状态改为 请求中
    yield put(changeEmailCheckStatus(EmailCheckStatus.PROGRESSING))

    const response = (yield call(
      Api.handleRegistEmailCheck,
      email
    )) as AxiosResponse<boolean>

    const { data } = response
    // 保存成功获取到的 emailUsedStatus
    yield put(
      saveEmailUsedStatus(
        data === true ? EmailUsedStatus.USED : EmailUsedStatus.UNUSED
      )
    )
  } catch (err) {
    // 预期外的错误
    yield put(changeEmailCheckStatus(EmailCheckStatus.FAILED))
    console.log(err)
  } finally {
    if (yield cancelled()) {
      // 如果是 取消saga
      yield put(changeEmailCheckStatus(EmailCheckStatus.CANCELLED))
    } else {
      // 请求完成（非取消）
      yield put({ type: 'SAGA_EMAIL_CHECK_FINISHED' })
    }
  }
}

function* watchSagaRequestEmailCheck(): Generator {
  while (true) {
    const action = (yield take(
      SAGA_REQUEST_EMAIL_CHECK
    )) as SagaRequestEmailCheckAction
    const task = (yield fork(handleEmailCheck, action)) as Task

    const resultAction = (yield take([
      SAGA_CANCEL_EMAIL_CHECK,
      'SAGA_EMAIL_CHECK_FINISHED',
    ])) as Action
    if (resultAction.type === SAGA_CANCEL_EMAIL_CHECK) {
      yield cancel(task)
    }
  }
}

// handle activate
function* handleActivate(action: SagaRequestActivateAction): Generator {
  try {
    const { email, activeCode } = action.payload

    yield put(changeActivateStatus(ActivateStatus.PROGRESSING))

    const response = (yield call(Api.handleActivate, {
      email,
      activeCode,
    })) as AxiosResponse<Api.ActivateReturnType>

    const { data } = response
    if (data !== true) {
      // api接口返回的错误信息
      yield put(changeActivateStatus(ActivateStatus.FAILED))
      yield put(addSnackbarItem({ message: data.msg }))
    } else {
      yield put(changeActivateStatus(ActivateStatus.SUCCESS))
      yield put(
        addSnackbarItem({
          messageComponent: FormattedMessage,
          messageComponentProps: {
            id: 'registPage.activeForm.txtActivateSuccess',
            defaultMessage: '账号激活成功',
          },
        })
      )
    }
  } catch (err) {
    // 预期外的错误
    yield put(changeActivateStatus(ActivateStatus.FAILED))
    yield put(addAxiosErrSnackbarItem(err))
  } finally {
    // 取消saga
    if (yield cancelled()) {
      yield put(changeActivateStatus(ActivateStatus.CANCELLED))
    } else {
      // 正常结束
      yield put({ type: 'SAGA_REQUEST_ACTIVATE_FINISHED' })
    }
  }
}

function* watchSagaRequestActivate(): Generator {
  while (true) {
    const action = (yield take(
      SAGA_REQUEST_ACTIVATE
    )) as SagaRequestActivateAction
    const task = (yield fork(handleActivate, action)) as Task

    const resultAction = (yield take([
      SAGA_CANCEL_ACTIVATE,
      'SAGA_REQUEST_ACTIVATE_FINISHED',
    ])) as Action
    if (resultAction.type === SAGA_CANCEL_ACTIVATE) {
      yield cancel(task)
    }
  }
}

export default function* registSaga(): Generator {
  yield all([
    watchSagaRequestRegist(),
    watchSagaRequestEmailCheck(),
    watchSagaRequestActivate(),
  ])
}
