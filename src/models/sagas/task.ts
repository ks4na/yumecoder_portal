import {
  take,
  fork,
  put,
  all,
  delay,
  cancel,
  cancelled,
} from 'redux-saga/effects'
import { Task } from 'redux-saga'
import {
  SAGA_DO_TASK,
  SagaDoTaskAction,
  addTask,
  completeTask,
  cancelTask,
  SAGA_CANCEL_TASK,
  SagaCancelTaskAction,
} from '../actions'

function* watchSagaDoTask() {
  while (true) {
    const action = yield take(SAGA_DO_TASK)
    const taskId = `task ${Date.now()}`
    const task = yield fork(sagaDoTask, action, taskId)
    yield put(addTask(taskId, task))
  }
}

function* sagaDoTask(action: SagaDoTaskAction, taskId: string) {
  try {
    yield delay(5000)
    yield put(completeTask(taskId))
  } finally {
    if (yield cancelled()) {
      yield put(cancelTask(taskId))
    }
  }
}

function* watchSagaCancelTask() {
  while (true) {
    const action = yield take(SAGA_CANCEL_TASK)
    yield fork(sagaCancelTask, action)
  }
}

function* sagaCancelTask(action: SagaCancelTaskAction) {
  const taskRef = action.payload as Task
  yield cancel(taskRef)
}

export default function* taskSaga() {
  yield all([watchSagaDoTask(), watchSagaCancelTask()])
}
