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

function* sagaDoTask(action: SagaDoTaskAction, taskId: string): Generator {
  try {
    yield delay(5000)
    yield put(completeTask(taskId))
  } finally {
    if (yield cancelled()) {
      yield put(cancelTask(taskId))
    }
  }
}

function* watchSagaDoTask(): Generator {
  while (true) {
    const action = yield take(SAGA_DO_TASK)
    const taskId = `task ${Date.now()}`
    const task = yield fork<typeof sagaDoTask>(
      sagaDoTask,
      action as SagaDoTaskAction,
      taskId
    )
    yield put(addTask(taskId, task as object))
  }
}

function* sagaCancelTask(action: SagaCancelTaskAction): Generator {
  const taskRef = action.payload as Task
  yield cancel(taskRef)
}

function* watchSagaCancelTask(): Generator {
  while (true) {
    const action = yield take(SAGA_CANCEL_TASK)
    yield fork<typeof sagaCancelTask>(
      sagaCancelTask,
      action as SagaCancelTaskAction
    )
  }
}

export default function* taskSaga(): Generator {
  yield all([watchSagaDoTask(), watchSagaCancelTask()])
}
