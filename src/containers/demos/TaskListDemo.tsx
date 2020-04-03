import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TaskList from '../../components/demos/TaskList'
import { sagaDoTask, sagaCancelTask } from '../../models/actions/task'

function WrappedTaskList(): JSX.Element {
  const tasks = useSelector(({ taskState }) => taskState.tasks)
  const dispatch = useDispatch()

  const taskListProps = {
    tasks,
    addAsyncTask(): void {
      dispatch(sagaDoTask())
    },
    cancelTask(ref: object): void {
      dispatch(sagaCancelTask(ref))
    },
  }

  return <TaskList {...taskListProps} />
}

export default WrappedTaskList
