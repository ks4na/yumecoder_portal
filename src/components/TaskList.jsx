import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'

function Task(props) {
  return (
    <>
      <h3>Task List</h3>
      <Button variant="contained" onClick={props.addAsyncTask}>
        添加一个5秒后完成的task
      </Button>
      <ul>
        {props.tasks.map(task => {
          return (
            <li key={task.id}>
              <p>任务id: {task.id}</p>
              <p>
                状态:{' '}
                {task.isCancelled ? (
                  <span>已取消</span>
                ) : task.isCompleted ? (
                  <span>已完成</span>
                ) : (
                  <>
                    <span>进行中</span>
                    <Button
                      size="small"
                      color="secondary"
                      onClick={() => props.cancelTask(task.ref)}
                    >
                      取消
                    </Button>
                  </>
                )}
              </p>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default Task

Task.propTypes = {
  addAsyncTask: PropTypes.func.isRequired,
  cancelTask: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      isCompleted: PropTypes.bool.isRequired,
      isCancelled: PropTypes.bool.isRequired,
      ref: PropTypes.object.isRequired
    })
  ).isRequired
}
