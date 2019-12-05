import {
  take,
  fork,
  put,
  all,
  delay,
  cancel,
  cancelled,
} from 'redux-saga/effects'
import {
  ADD_ASYNC_TASK,
  addTask,
  completeTask,
  cancelTask,
  CANCEL_ASYNC_TASK,
} from '../actions/task.js'

function* watchAddAsyncTask() {
  while (true) {
    const action = yield take(ADD_ASYNC_TASK)
    const taskName = `task ${Date.now()}`
    const task = yield fork(addAsyncTask, action, taskName)
    yield put(addTask(taskName, task))
  }
}

function* addAsyncTask(action, taskName) {
  try {
    yield delay(5000)
    yield put(completeTask(taskName))
  } finally {
    if (yield cancelled()) {
      yield put(cancelTask(taskName))
    }
  }
}

function* watchCancelAsyncTask() {
  while (true) {
    const action = yield take(CANCEL_ASYNC_TASK)
    yield fork(cancelAsyncTask, action)
  }
}

function* cancelAsyncTask(action) {
  const taskRef = action.payload
  yield cancel(taskRef)
}

export default function* taskSaga() {
  yield all([watchAddAsyncTask(), watchCancelAsyncTask()])
}
