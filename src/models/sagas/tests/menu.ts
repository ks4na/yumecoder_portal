import {
  all,
  take,
  fork,
  cancel,
  cancelled,
  call,
  put,
} from 'redux-saga/effects'
import {
  SAGA_FETCH_TEST_MENU_DATA,
  SAGA_CANCEL_FETCH_TEST_MENU_DATA,
  changeTestMenuStatus,
  addAxiosErrSnackbarItem,
  saveTestMenuData,
} from '../../actions'
import { Task } from 'redux-saga'
import { Action } from 'redux'
import { Status } from '../../reducers/status'
import * as Api from '../../apis'

// fetchTestMenuData
function* fetchTestMenuData(): Generator {
  try {
    yield put(changeTestMenuStatus(Status.PROGRESSING))

    const testMenuData = (yield call(
      Api.handleRequestTestMenuData
    )) as Api.TestMenuDataReturnType

    yield put(changeTestMenuStatus(Status.SUCCESS))
    yield put(saveTestMenuData(testMenuData))
  } catch (err) {
    yield put(changeTestMenuStatus(Status.FAILED))
    yield put(addAxiosErrSnackbarItem(err))
  } finally {
    if (yield cancelled()) {
      yield put(changeTestMenuStatus(Status.CANCELLED))
    } else {
      yield put({ type: 'SAGA_FETCH_TEST_MENU_DATA_FINISHED' })
    }
  }
}

function* watchSagaRequestTestMenuData(): Generator {
  while (true) {
    yield take(SAGA_FETCH_TEST_MENU_DATA)
    const task = (yield fork(fetchTestMenuData)) as Task

    const resultAction = (yield take([
      SAGA_CANCEL_FETCH_TEST_MENU_DATA,
      'SAGA_FETCH_TEST_MENU_DATA_FINISHED',
    ])) as Action
    if (resultAction.type === SAGA_CANCEL_FETCH_TEST_MENU_DATA) {
      yield cancel(task)
    }

    yield put(changeTestMenuStatus(Status.INITIAL))
  }
}

export default function* testMenuSaga(): Generator {
  yield all([watchSagaRequestTestMenuData()])
}
