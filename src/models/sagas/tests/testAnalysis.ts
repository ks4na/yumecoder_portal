import {
  all,
  take,
  fork,
  cancel,
  put,
  cancelled,
  call,
} from 'redux-saga/effects'
import {
  SagaFetchTestAnalysisDataAction,
  SAGA_FETCH_TEST_ANALYSIS_DATA,
  SAGA_CANCEL_FETCH_TEST_ANALYSIS_DATA,
  changeTestAnalysisRequestStatus,
  addAxiosErrSnackbarItem,
  addSnackbarItem,
  saveTestAnalysisData,
} from '../../actions'
import { Task } from 'redux-saga'
import { Action } from 'redux'
import { Status } from '../../reducers/status'
import * as Api from '../../apis'

// fetch testAnalysis data
export function* fetchTestAnalysisData(
  action: SagaFetchTestAnalysisDataAction
): Generator {
  try {
    const testId = action.payload

    yield put(changeTestAnalysisRequestStatus(Status.PROGRESSING))

    const data = (yield call(
      Api.handleFetchTestAnalysisData,
      testId
    )) as Api.FetchTestAnalysisDataReturnType

    if (!Api.isTestAnalysisDataType(data)) {
      yield put(changeTestAnalysisRequestStatus(Status.FAILED))
      yield put(addSnackbarItem({ message: data.msg }))
    } else {
      yield put(changeTestAnalysisRequestStatus(Status.SUCCESS))
      yield put(saveTestAnalysisData(data))
    }
  } catch (err) {
    yield put(changeTestAnalysisRequestStatus(Status.FAILED))
    yield put(addAxiosErrSnackbarItem(err))
  } finally {
    if (yield cancelled()) {
      yield put(changeTestAnalysisRequestStatus(Status.CANCELLED))
    } else {
      yield put({ type: 'SAGA_FETCH_TEST_ANALYSIS_DATA_FINISHED' })
    }
  }
}

export function* watchSagaFetchTestAnalysisData(): Generator {
  while (true) {
    const action = (yield take(
      SAGA_FETCH_TEST_ANALYSIS_DATA
    )) as SagaFetchTestAnalysisDataAction
    const task = (yield fork(fetchTestAnalysisData, action)) as Task

    const resultAction = (yield take([
      SAGA_CANCEL_FETCH_TEST_ANALYSIS_DATA,
      'SAGA_FETCH_TEST_ANALYSIS_DATA_FINISHED',
    ])) as Action
    if (resultAction.type === SAGA_CANCEL_FETCH_TEST_ANALYSIS_DATA) {
      yield cancel(task)
    }
  }
}

export default function* testAnalysisSaga(): Generator {
  yield all([watchSagaFetchTestAnalysisData()])
}
