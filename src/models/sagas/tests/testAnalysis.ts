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
  SAGA_CANCEL_UPDATE_COLLECT_STATUS,
  SAGA_UPDATE_COLLECT_STATUS,
  SagaUpdateCollectStatusAction,
  changeToggleCollectStatus,
  toggleCollectStatus,
} from '../../actions'
import { Task } from 'redux-saga'
import { Action } from 'redux'
import { Status } from '../../reducers/status'
import * as Api from '../../apis'
import { AxiosResponse } from 'axios'
import { FormattedMessage } from 'react-intl'
import { AnalysisDataQuestionCollectStatus } from '../../reducers/tests/testAnalysis'

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

// update collect status
export function* updateCollectStatus(
  action: SagaUpdateCollectStatusAction
): Generator {
  const { questionId, isCollected } = action.payload
  try {
    yield put(changeToggleCollectStatus(Status.PROGRESSING))

    const response = (yield call(
      Api.handleUpdateCollectStatus,
      questionId,
      isCollected
    )) as AxiosResponse<Api.UpdateCollectStatusReturnType>

    const { data } = response
    if (data !== true) {
      yield put(changeToggleCollectStatus(Status.FAILED))
      yield put(addSnackbarItem({ message: data.msg }))
    } else {
      yield put(changeToggleCollectStatus(Status.SUCCESS))
      yield put(toggleCollectStatus(questionId, isCollected))
      // 添加 snackbar 提示
      if (isCollected === AnalysisDataQuestionCollectStatus.COLLECTED) {
        yield put(
          addSnackbarItem({
            messageComponent: FormattedMessage,
            messageComponentProps: {
              id: 'test.testAnalysisPage.btnCollect.txtAddToCollectionSuccess',
              defaultMessage: '成功添加到收藏',
            },
            autoHideDuration: 1000,
            hideDefaultActionComponent: true,
          })
        )
      } else {
        yield put(
          addSnackbarItem({
            messageComponent: FormattedMessage,
            messageComponentProps: {
              id:
                'test.testAnalysisPage.btnCollect.txtRemoveFromCollectionSuccess',
              defaultMessage: '成功取消收藏',
            },
            autoHideDuration: 1000,
            hideDefaultActionComponent: true,
          })
        )
      }
    }
  } catch (err) {
    yield put(changeToggleCollectStatus(Status.FAILED))
    yield put(addAxiosErrSnackbarItem(err))
  } finally {
    if (yield cancelled()) {
      yield put(changeToggleCollectStatus(Status.CANCELLED))
    } else {
      yield put({ type: 'SAGA_UPDATE_COLLECT_STATUS_FINISHED' })
    }
  }
}

export function* watchSagaUpdateCollectStatus(): Generator {
  while (true) {
    const action = (yield take(
      SAGA_UPDATE_COLLECT_STATUS
    )) as SagaUpdateCollectStatusAction
    const task = (yield fork(updateCollectStatus, action)) as Task

    const resultAction = (yield take([
      SAGA_CANCEL_UPDATE_COLLECT_STATUS,
      'SAGA_UPDATE_COLLECT_STATUS_FINISHED',
    ])) as Action

    if (resultAction.type === SAGA_CANCEL_UPDATE_COLLECT_STATUS) {
      yield cancel(task)
    }
  }
}

export default function* testAnalysisSaga(): Generator {
  yield all([watchSagaFetchTestAnalysisData(), watchSagaUpdateCollectStatus()])
}
