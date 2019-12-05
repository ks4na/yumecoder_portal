export const ADD_TASK = 'ADD_TASK'
export const ADD_ASYNC_TASK = 'ADD_ASYNC_TASK'
export const COMPLETE_TASK = 'COMPLETE_TASK'
export const CANCEL_TASK = 'CANCEL_TASK'
export const CANCEL_ASYNC_TASK = 'CANCEL_ASYNC_TASK'

export function addTask(id, ref) {
  return {
    type: ADD_TASK,
    payload: {
      id,
      isCompleted: false,
      isCancelled: false,
      ref,
    },
  }
}

export function addAsyncTask() {
  return {
    type: ADD_ASYNC_TASK,
  }
}

export function completeTask(taskName) {
  return {
    type: COMPLETE_TASK,
    payload: taskName,
  }
}

export function cancelTask(taskName) {
  return {
    type: CANCEL_TASK,
    payload: taskName,
  }
}

export function cancelAsyncTask(taskRef) {
  return {
    type: CANCEL_ASYNC_TASK,
    payload: taskRef,
  }
}
