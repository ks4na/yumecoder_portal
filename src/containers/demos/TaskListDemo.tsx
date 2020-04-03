import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TaskList from '../../components/demos/TaskList'
import { sagaDoTask, sagaCancelTask } from '../../models/actions/task'

function WrappedTaskList() {
  const tasks = useSelector(({ taskState }) => taskState.tasks)
  const dispatch = useDispatch()

  const taskListProps = {
    tasks,
    addAsyncTask() {
      dispatch(sagaDoTask())
    },
    cancelTask(ref: object) {
      dispatch(sagaCancelTask(ref))
    },
  }

  return <TaskList {...taskListProps} />
}

export default WrappedTaskList
