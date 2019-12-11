import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TaskList from '../../components/demos/TaskList.jsx'
import { addAsyncTask, cancelAsyncTask } from '../../models/actions/task.js'

function WrappedTaskList() {
  const tasks = useSelector(({ tasks }) => tasks)
  const dispatch = useDispatch()

  const taskListProps = {
    tasks,
    addAsyncTask() {
      dispatch(addAsyncTask())
    },
    cancelTask(ref) {
      dispatch(cancelAsyncTask(ref))
    },
  }

  return <TaskList {...taskListProps} />
}

export default WrappedTaskList
