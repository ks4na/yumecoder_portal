export const ADD_TASK = 'ADD_TASK'
export type ADD_TASK = typeof ADD_TASK

export const COMPLETE_TASK = 'COMPLETE_TASK'
export type COMPLETE_TASK = typeof COMPLETE_TASK

export const CANCEL_TASK = 'CANCEL_TASK'
export type CANCEL_TASK = typeof CANCEL_TASK

export interface AddTaskAction {
  type: ADD_TASK
  payload: {
    id: string
    isCompleted: boolean
    isCancelled: boolean
    ref: object
  }
}
export function addTask(id: string, ref: object): AddTaskAction {
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

export interface CompleteTaskAction {
  type: COMPLETE_TASK
  payload: string
}

export function completeTask(taskId: string): CompleteTaskAction {
  return {
    type: COMPLETE_TASK,
    payload: taskId,
  }
}

export interface CancelTaskAction {
  type: CANCEL_TASK
  payload: string
}

export function cancelTask(taskId: string): CancelTaskAction {
  return {
    type: CANCEL_TASK,
    payload: taskId,
  }
}

export type TaskActions = AddTaskAction | CompleteTaskAction | CancelTaskAction

///////////
// sagas
///////////

export const SAGA_DO_TASK = 'SAGA_DO_TASK'
export type SAGA_DO_TASK = typeof SAGA_DO_TASK

export const SAGA_CANCEL_TASK = 'SAGA_CANCEL_TASK'
export type SAGA_CANCEL_TASK = typeof SAGA_CANCEL_TASK

export interface SagaDoTaskAction {
  type: SAGA_DO_TASK
}

export function sagaDoTask(): SagaDoTaskAction {
  return {
    type: SAGA_DO_TASK,
  }
}

export interface SagaCancelTaskAction {
  type: SAGA_CANCEL_TASK
  payload: object
}

export function sagaCancelTask(taskRef: object): SagaCancelTaskAction {
  return {
    type: SAGA_CANCEL_TASK,
    payload: taskRef,
  }
}
