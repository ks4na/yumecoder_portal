import {
  all,
  take,
  call,
  put,
  cancelled,
  fork,
  cancel,
  takeLatest,
} from 'redux-saga/effects'
import {
  SAGA_FETCH_USER_INFO,
  SAGA_CANCEL_FETCH_USER_INFO,
  changeUserStateStatus,
  saveUserInfo,
  addAxiosErrSnackbarItem,
  SAGA_ALTER_USER_NICKNAME,
  SagaAlterUserNicknameAction,
  changeUserDataUpdateStatus,
  addSnackbarItem,
  updateUserData,
  SagaAlterUserGenderAction,
  SAGA_ALTER_USER_GENDER,
  SAGA_ALTER_USER_PERSONALSIGNATURE,
  SagaAlterUserPersonalSignatureAction,
  SAGA_ALTER_USER_AVATAR,
  SagaAlterUserAvatarAction,
  SAGA_ALTER_USER_QUESTIONSPERTEST,
  SagaAlterUserQuesionsPerTestAction,
  SagaAlterUserTestRangeAction,
  SAGA_ALTER_USER_TESTRANGE,
  SAGA_ALTER_USER_PASSWORD,
  SagaAlterUserPasswordAction,
} from '../actions'
import { Status } from '../reducers/status'
import * as Api from '../apis'
import { Task } from 'redux-saga'
import { Action } from 'redux'
import { AxiosResponse } from 'axios'

// fetch userInfo
export function* fetchUserInfo(): Generator {
  try {
    yield put(changeUserStateStatus(Status.PROGRESSING))

    const responseData = (yield call(
      Api.handleFetchUserData
    )) as Api.FetchUserDataReturnType

    yield put(saveUserInfo(responseData))
    yield put(changeUserStateStatus(Status.SUCCESS))
  } catch (err) {
    yield put(changeUserStateStatus(Status.FAILED))
    yield put(addAxiosErrSnackbarItem(err))
  } finally {
    if (yield cancelled()) {
      yield put(changeUserStateStatus(Status.CANCELLED))
    } else {
      yield put({ type: 'SAGA_FETCH_USER_INFO_FINISHED' })
    }
  }
}

export function* watchSagaFetchUserInfo(): Generator {
  while (true) {
    yield take(SAGA_FETCH_USER_INFO)
    const task = (yield fork(fetchUserInfo)) as Task

    const resultAction = (yield take([
      SAGA_CANCEL_FETCH_USER_INFO,
      'SAGA_FETCH_USER_INFO_FINISHED',
    ])) as Action
    if (resultAction.type === SAGA_CANCEL_FETCH_USER_INFO) {
      yield cancel(task)
    }

    yield put(changeUserStateStatus(Status.INITIAL))
  }
}

// alter user nickname
export function* alterUserNickname(
  action: SagaAlterUserNicknameAction
): Generator {
  try {
    const nickname = action.payload
    const successCallback = action.successCallback
    yield put(changeUserDataUpdateStatus(Status.PROGRESSING))

    const response = (yield call(Api.handleUpdateUserData, {
      nickname,
    })) as AxiosResponse<Api.UpdateUserDataReturnType>

    const { data } = response
    if (data !== true) {
      yield put(changeUserDataUpdateStatus(Status.FAILED))
      yield put(addSnackbarItem({ message: data.msg }))
    } else {
      yield put(changeUserDataUpdateStatus(Status.SUCCESS))
      // 更新 user 的 nickname
      yield put(updateUserData({ nickname }))
      // 触发传递过来的回调函数
      successCallback && successCallback()
    }
  } catch (err) {
    yield put(changeUserDataUpdateStatus(Status.FAILED))
    yield put(addAxiosErrSnackbarItem(err))
  } finally {
    yield put(changeUserDataUpdateStatus(Status.INITIAL))
  }
}

export function* watchSagaAlterUserNickname(): Generator {
  yield takeLatest(SAGA_ALTER_USER_NICKNAME, alterUserNickname)
}

// alter user gender
export function* alterUserGender(action: SagaAlterUserGenderAction): Generator {
  try {
    const gender = action.payload
    const successCallback = action.successCallback

    yield put(changeUserDataUpdateStatus(Status.PROGRESSING))

    const response = (yield call(Api.handleUpdateUserData, {
      gender,
    })) as AxiosResponse<Api.UpdateUserDataReturnType>

    const { data } = response
    if (data !== true) {
      yield put(changeUserDataUpdateStatus(Status.FAILED))
      yield put(addSnackbarItem({ message: data.msg }))
    } else {
      yield put(changeUserDataUpdateStatus(Status.SUCCESS))
      // 更新 user 的 gender
      yield put(updateUserData({ gender }))
      // 触发传递过来的回调函数
      successCallback && successCallback()
    }
  } catch (err) {
    yield put(changeUserDataUpdateStatus(Status.FAILED))
    yield put(addAxiosErrSnackbarItem(err))
  } finally {
    yield put(changeUserDataUpdateStatus(Status.INITIAL))
  }
}

export function* watchSagaAlterUserGender(): Generator {
  yield takeLatest(SAGA_ALTER_USER_GENDER, alterUserGender)
}

// alter user personalSignature
export function* alterUserPersonalSignature(
  action: SagaAlterUserPersonalSignatureAction
): Generator {
  try {
    const personalSignature = action.payload
    const successCallback = action.successCallback

    yield put(changeUserDataUpdateStatus(Status.PROGRESSING))

    const response = (yield call(Api.handleUpdateUserData, {
      personalSignature,
    })) as AxiosResponse<Api.UpdateUserDataReturnType>

    const { data } = response

    if (data !== true) {
      yield put(changeUserDataUpdateStatus(Status.FAILED))
      yield put(addSnackbarItem({ message: data.msg }))
    } else {
      yield put(changeUserDataUpdateStatus(Status.SUCCESS))
      // 更新 user 的 personalSignature
      yield put(updateUserData({ personalSignature }))
      // 触发传递过来的回调函数
      successCallback && successCallback()
    }
  } catch (err) {
    yield put(changeUserDataUpdateStatus(Status.FAILED))
    yield put(addAxiosErrSnackbarItem(err))
  } finally {
    yield put(changeUserDataUpdateStatus(Status.INITIAL))
  }
}

export function* watchSagaAlterUserPersonalSignature(): Generator {
  yield takeLatest(
    SAGA_ALTER_USER_PERSONALSIGNATURE,
    alterUserPersonalSignature
  )
}

// alter user avatar

export function* alterUserAvatar(action: SagaAlterUserAvatarAction): Generator {
  try {
    const avatar = action.payload
    const successCallback = action.successCallback

    yield put(changeUserDataUpdateStatus(Status.PROGRESSING))

    const response = (yield call(
      Api.handleUpdateUserAvatar,
      avatar
    )) as AxiosResponse<Api.UpdateUserAvatarReturnType>

    const { data } = response
    if (typeof data !== 'string') {
      yield put(changeUserDataUpdateStatus(Status.FAILED))
      yield put(addSnackbarItem({ message: data.msg }))
    } else {
      yield put(changeUserDataUpdateStatus(Status.SUCCESS))
      // 更新 user 的 avatar 字段
      // 这里使用接口返回的 data （avatar 对应的 url）而
      // 不是 action 传递的 avatar （BASE64 字符串）
      yield put(updateUserData({ avatar: data }))
      // 触发传递过来的回调函数
      successCallback && successCallback()
    }
  } catch (err) {
    yield put(changeUserDataUpdateStatus(Status.FAILED))
    yield put(addAxiosErrSnackbarItem(err))
  } finally {
    yield put(changeUserDataUpdateStatus(Status.INITIAL))
  }
}

export function* watchSagaAlterUserAvatar(): Generator {
  yield takeLatest(SAGA_ALTER_USER_AVATAR, alterUserAvatar)
}

// alter user questionsPerTest
export function* alterUserQuestionsPerTest(
  action: SagaAlterUserQuesionsPerTestAction
): Generator {
  try {
    const questionNumberPerTime = action.payload
    const successCallback = action.successCallback

    yield put(changeUserDataUpdateStatus(Status.PROGRESSING))

    const response = (yield call(Api.handleUpdateUserData, {
      questionNumberPerTime,
    })) as AxiosResponse<Api.UpdateUserDataReturnType>

    const { data } = response
    if (data !== true) {
      yield put(changeUserDataUpdateStatus(Status.FAILED))
      yield put(addSnackbarItem({ message: data.msg }))
    } else {
      yield put(changeUserDataUpdateStatus(Status.SUCCESS))
      // 更新 user 的 questionNumberPerTime
      yield put(updateUserData({ questionNumberPerTime }))
      // 触发传递过来的回调函数
      successCallback && successCallback()
    }
  } catch (err) {
    yield put(changeUserDataUpdateStatus(Status.FAILED))
    yield put(addAxiosErrSnackbarItem(err))
  } finally {
    yield put(changeUserDataUpdateStatus(Status.INITIAL))
  }
}

export function* watchSagaAlterUserQuestionsPerTest(): Generator {
  yield takeLatest(SAGA_ALTER_USER_QUESTIONSPERTEST, alterUserQuestionsPerTest)
}

// alter user testRange
export function* alterUserTestRange(
  action: SagaAlterUserTestRangeAction
): Generator {
  try {
    const testRange = action.payload
    const successCallback = action.successCallback

    yield put(changeUserDataUpdateStatus(Status.PROGRESSING))
    const response = (yield call(Api.handleUpdateUserData, {
      testRange,
    })) as AxiosResponse<Api.UpdateUserDataReturnType>

    const { data } = response
    if (data !== true) {
      yield put(changeUserDataUpdateStatus(Status.FAILED))
      yield put(addSnackbarItem({ message: data.msg }))
    } else {
      yield put(changeUserDataUpdateStatus(Status.SUCCESS))
      // 更新 user 的 testRange
      yield put(updateUserData({ testRange }))
      // 触发传递过来的回调函数
      successCallback && successCallback()
    }
  } catch (err) {
    yield put(changeUserDataUpdateStatus(Status.FAILED))
    yield put(addAxiosErrSnackbarItem(err))
  } finally {
    yield put(changeUserDataUpdateStatus(Status.INITIAL))
  }
}

export function* watchSagaAlterUserTestRange(): Generator {
  yield takeLatest(SAGA_ALTER_USER_TESTRANGE, alterUserTestRange)
}

// alter user password
export function* alterUserPassword(
  action: SagaAlterUserPasswordAction
): Generator {
  try {
    const { newPwd, oldPwd } = action.payload
    const successCallback = action.successCallback

    yield put(changeUserDataUpdateStatus(Status.PROGRESSING))

    const response = (yield call(Api.handleAlterUserPassword, {
      oldPwd,
      newPwd,
    })) as AxiosResponse<Api.AlterUserPasswordReturnType>
    const { data } = response

    if (data !== true) {
      yield put(changeUserDataUpdateStatus(Status.FAILED))
      yield put(addSnackbarItem({ message: data.msg }))
    } else {
      yield put(changeUserDataUpdateStatus(Status.SUCCESS))
      // 触发传递过来的回调函数
      successCallback && successCallback()
    }
  } catch (err) {
    yield put(changeUserDataUpdateStatus(Status.FAILED))
    yield put(addAxiosErrSnackbarItem(err))
  } finally {
    yield put(changeUserDataUpdateStatus(Status.INITIAL))
  }
}

export function* watchSagaAlterUserPassword(): Generator {
  yield takeLatest(SAGA_ALTER_USER_PASSWORD, alterUserPassword)
}

export default function* UserSaga(): Generator {
  yield all([
    watchSagaFetchUserInfo(),
    watchSagaAlterUserNickname(),
    watchSagaAlterUserGender(),
    watchSagaAlterUserPersonalSignature(),
    watchSagaAlterUserAvatar(),
    watchSagaAlterUserQuestionsPerTest(),
    watchSagaAlterUserTestRange(),
    watchSagaAlterUserPassword(),
  ])
}
