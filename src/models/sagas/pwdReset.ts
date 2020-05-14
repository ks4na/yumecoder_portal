import {
  take,
  fork,
  cancel,
  cancelled,
  put,
  call,
  all,
} from 'redux-saga/effects'
import {
  SagaRequestPwdResetEmailValidationAction,
  SAGA_REQUEST_PWD_RESET_EMAIL_VALIDATION,
  SAGA_CANCEL_PWD_RESET_EMAIL_VALIDATION,
  changePwdResetEmailValidateStatus,
  addSnackbarItem,
  addAxiosErrSnackbarItem,
  SAGA_REQUEST_PWD_RESET,
  SAGA_CANCEL_PWD_RESET,
  SagaRequestPwdResetAction,
  changePwdResetStatus,
} from '../actions'
import { Task } from 'redux-saga'
import { Action } from 'redux'
import { Status } from '../reducers/status'
import * as Api from '../apis'
import { AxiosResponse } from 'axios'
import { FormattedMessage } from 'react-intl'

// handle pwdReset email validation
function* handleEmailValidation(
  action: SagaRequestPwdResetEmailValidationAction
): Generator {
  try {
    const { email, captcha } = action.payload

    yield put(changePwdResetEmailValidateStatus(Status.PROGRESSING))

    const response = (yield call(Api.handleEmailValidation, {
      email,
      captcha,
    })) as AxiosResponse<Api.EmailValidationReturnType>

    const { data } = response
    if (data !== true) {
      yield put(changePwdResetEmailValidateStatus(Status.FAILED))
      yield put(addSnackbarItem({ message: data.msg }))
    } else {
      yield put(changePwdResetEmailValidateStatus(Status.SUCCESS))
      yield put(
        addSnackbarItem({
          messageComponent: FormattedMessage,
          messageComponentProps: {
            id:
              'password.pwdResetPage.emailValidateForm.txtEmailValidationSuccess',
            defaultMessage: '验证码已发送至您的邮箱',
          },
        })
      )
    }
  } catch (err) {
    yield put(changePwdResetEmailValidateStatus(Status.FAILED))
    yield put(addAxiosErrSnackbarItem(err))
  } finally {
    // 取消 saga
    if (yield cancelled()) {
      yield put(changePwdResetEmailValidateStatus(Status.CANCELLED))
    } else {
      // 正常结束 saga 流程
      yield put({ type: 'SAGA_PWD_RESET_EMAIL_VALIDATION_FINISHED' })
    }
  }
}

function* watchSagaRequestPwdResetEmailValidation(): Generator {
  while (true) {
    const action = (yield take(
      SAGA_REQUEST_PWD_RESET_EMAIL_VALIDATION
    )) as SagaRequestPwdResetEmailValidationAction
    const task = (yield fork(handleEmailValidation, action)) as Task

    const resultAction = (yield take([
      SAGA_CANCEL_PWD_RESET_EMAIL_VALIDATION,
      'SAGA_PWD_RESET_EMAIL_VALIDATION_FINISHED',
    ])) as Action
    if (resultAction.type === SAGA_CANCEL_PWD_RESET_EMAIL_VALIDATION) {
      yield cancel(task)
    }
  }
}

// handle pwd reset

function* handlePwdReset(action: SagaRequestPwdResetAction): Generator {
  try {
    const { email, password, validationCode } = action.payload

    yield put(changePwdResetStatus(Status.PROGRESSING))

    const response = (yield call(Api.handlePwdReset, {
      email,
      password,
      validationCode,
    })) as AxiosResponse<Api.PwdResetReturnType>

    const { data } = response
    if (data !== true) {
      yield put(changePwdResetStatus(Status.FAILED))
      yield put(addSnackbarItem({ message: data.msg }))
    } else {
      yield put(changePwdResetStatus(Status.SUCCESS))
    }
  } catch (err) {
    yield put(changePwdResetStatus(Status.FAILED))
    yield put(addAxiosErrSnackbarItem(err))
  } finally {
    if (yield cancelled()) {
      yield put(changePwdResetStatus(Status.CANCELLED))
    } else {
      yield put({ type: 'SAGA_REQUEST_PWD_RESET_FINISHED' })
    }
  }
}

function* watchSagaRequestPwdReset(): Generator {
  while (true) {
    const action = (yield take(
      SAGA_REQUEST_PWD_RESET
    )) as SagaRequestPwdResetAction
    const task = (yield fork(handlePwdReset, action)) as Task

    const resultAction = (yield take([
      SAGA_CANCEL_PWD_RESET,
      'SAGA_REQUEST_PWD_RESET_FINISHED',
    ])) as Action
    if (resultAction.type === SAGA_CANCEL_PWD_RESET) {
      yield cancel(task)
    }
  }
}

export default function* pwdResetSaga(): Generator {
  yield all([
    watchSagaRequestPwdResetEmailValidation(),
    watchSagaRequestPwdReset(),
  ])
}
