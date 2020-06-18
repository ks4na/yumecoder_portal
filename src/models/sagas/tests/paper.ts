import {
  all,
  put,
  call,
  take,
  cancelled,
  fork,
  cancel,
} from 'redux-saga/effects'
import {
  SAGA_REQUEST_PREPAREPAPER,
  changePreparePaperStatus,
  addAxiosErrSnackbarItem,
  SAGA_CANCEL_PREPAREPAPER,
  SagaRequestPreparePaperAction,
  addSnackbarItem,
} from '../../actions'
import { Status } from '../../reducers/status'
import { Task } from 'redux-saga'
import { Action } from 'redux'
import * as Api from '../../apis'
import { AxiosResponse } from 'axios'

// request preparePaper
export function* preparePaper(
  action: SagaRequestPreparePaperAction
): Generator {
  try {
    const categoryId = action.payload
    const successCallback = action.successCallback

    yield put(changePreparePaperStatus(Status.PROGRESSING))

    const response = (yield call(Api.handlePreparePaper, {
      categoryId,
    })) as AxiosResponse<Api.PreparePaperReturnType>

    const { data } = response
    if (typeof data !== 'number') {
      yield put(changePreparePaperStatus(Status.FAILED))
      yield put(addSnackbarItem({ message: data.msg }))
    } else {
      yield put(changePreparePaperStatus(Status.SUCCESS))
      // 触发成功回调函数
      successCallback && successCallback(data)
    }
  } catch (err) {
    yield put(changePreparePaperStatus(Status.FAILED))
    yield put(addAxiosErrSnackbarItem(err))
  } finally {
    if (yield cancelled()) {
      yield put(changePreparePaperStatus(Status.CANCELLED))
    } else {
      yield put({ type: 'SAGA_REQUEST_PREPAREPAPER_FINISHED' })
    }
  }
}

export function* watchSagaPreparePaper(): Generator {
  while (true) {
    const action = (yield take(
      SAGA_REQUEST_PREPAREPAPER
    )) as SagaRequestPreparePaperAction
    const task = (yield fork(preparePaper, action)) as Task

    const resultAction = (yield take([
      SAGA_CANCEL_PREPAREPAPER,
      'SAGA_REQUEST_PREPAREPAPER_FINISHED',
    ])) as Action

    if (resultAction.type === SAGA_CANCEL_PREPAREPAPER) {
      yield cancel(task)
    }

    // 重置 preparePaperStatus 为初始值
    yield put(changePreparePaperStatus(Status.INITIAL))
  }
}

export default function* paperSaga(): Generator {
  yield all([watchSagaPreparePaper()])
}
