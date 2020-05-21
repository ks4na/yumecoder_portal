import {
  take,
  fork,
  cancel,
  cancelled,
  all,
  call,
  put,
} from 'redux-saga/effects'
import {
  SAGA_FETCH_SHORTCUTLIST_COUNT,
  SAGA_CANCEL_FETCH_SHORTCUTLIST_COUNT,
  changeShortcutListCountStatus,
  addAxiosErrSnackbarItem,
  saveShortcutListCountData,
} from '../../actions'
import { Task } from 'redux-saga'
import { Action } from 'redux'
import { Status } from '../../reducers/status'
import * as Api from '../../apis'

// fetch shortcutListCount
export function* fetchShortcutListCount(): Generator {
  try {
    yield put(changeShortcutListCountStatus(Status.PROGRESSING))

    const responseData = (yield call(
      Api.handleFetchShortcutListCount
    )) as Api.FetchShortcutListCountReturnType

    yield put(saveShortcutListCountData(responseData))
    yield put(changeShortcutListCountStatus(Status.SUCCESS))
  } catch (err) {
    yield put(changeShortcutListCountStatus(Status.FAILED))
    yield put(addAxiosErrSnackbarItem(err))
  } finally {
    if (yield cancelled()) {
      yield put(changeShortcutListCountStatus(Status.CANCELLED))
    } else {
      yield put({ type: 'SAGA_FETCH_SHORTCUTLIST_COUNT_FINISHED' })
    }
  }
}

export function* watchSagaFetchShortcutListCount(): Generator {
  while (true) {
    yield take(SAGA_FETCH_SHORTCUTLIST_COUNT)
    const task = (yield fork(fetchShortcutListCount)) as Task

    const resultAction = (yield take([
      SAGA_CANCEL_FETCH_SHORTCUTLIST_COUNT,
      'SAGA_FETCH_SHORTCUTLIST_COUNT_FINISHED',
    ])) as Action
    if (resultAction.type === SAGA_CANCEL_FETCH_SHORTCUTLIST_COUNT) {
      yield cancel(task)
    }

    yield put(changeShortcutListCountStatus(Status.INITIAL))
  }
}

export default function* ShortcutListCountReducer(): Generator {
  yield all([watchSagaFetchShortcutListCount()])
}
