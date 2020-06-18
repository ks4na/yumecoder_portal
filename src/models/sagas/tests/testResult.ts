import {
  all,
  fork,
  take,
  cancel,
  put,
  call,
  cancelled,
} from 'redux-saga/effects'
import {
  SagaFetchTestResultAction,
  SAGA_FETCH_TEST_RESULT,
  SAGA_CANCEL_FETCH_TEST_RESULT,
  changeTestResultRequestStatus,
  addSnackbarItem,
  addAxiosErrSnackbarItem,
  saveTestResult,
} from '../../actions'
import { Task } from 'redux-saga'
import { Action } from 'redux'
import { Status } from '../../reducers/status'
import * as Api from '../../apis'

// fetch test result
export function* fetchTestResult(action: SagaFetchTestResultAction): Generator {
  try {
    const testId = action.payload

    yield put(changeTestResultRequestStatus(Status.PROGRESSING))

    const data = (yield call(
      Api.handleFetchTestResult,
      testId
    )) as Api.FetchTestResultReturnType

    if (!Api.isTestResultData(data)) {
      yield put(changeTestResultRequestStatus(Status.FAILED))
      yield put(addSnackbarItem({ message: data.msg }))
    } else {
      yield put(changeTestResultRequestStatus(Status.SUCCESS))
      // 保存 testResultData
      yield put(saveTestResult(data))
    }
  } catch (err) {
    yield put(changeTestResultRequestStatus(Status.FAILED))
    yield put(addAxiosErrSnackbarItem(err))
  } finally {
    if (yield cancelled()) {
      yield put(changeTestResultRequestStatus(Status.CANCELLED))
    } else {
      yield put({ type: 'SAGA_FETCH_TEST_RESULT_FINISHED' })
    }
  }
}

export function* watchSagaFetchTestResult(): Generator {
  while (true) {
    const action = (yield take(
      SAGA_FETCH_TEST_RESULT
    )) as SagaFetchTestResultAction
    const task = (yield fork(fetchTestResult, action)) as Task

    const resultAction = (yield take([
      SAGA_CANCEL_FETCH_TEST_RESULT,
      'SAGA_FETCH_TEST_RESULT_FINISHED',
    ])) as Action

    if (resultAction.type === SAGA_CANCEL_FETCH_TEST_RESULT) {
      yield cancel(task)
    }
  }
}

export default function* testResultSaga(): Generator {
  yield all([watchSagaFetchTestResult()])
}
