import { ADD_TASK, COMPLETE_TASK, CANCEL_TASK } from '../actions/task.js'

const initState = [
  {
    id: 'demo task1',
    isCompleted: true,
    isCancelled: false,
    ref: { id: 'demo task1' }
  },
  {
    id: 'demo task2',
    isCompleted: true,
    isCancelled: true,
    ref: { id: 'demo task2' }
  },
  {
    id: 'demo task3',
    isCompleted: false,
    isCancelled: true,
    ref: { id: 'demo task3' }
  }
]

export default function taskReducer(state = initState, action) {
  switch (action.type) {
    case ADD_TASK:
      return [...state, action.payload]
    case COMPLETE_TASK:
      return state.map(item => {
        if (item.id === action.payload) {
          return {
            ...item,
            isCompleted: true
          }
        }
        return item
      })
    case CANCEL_TASK:
      return state.map(item => {
        if (item.id === action.payload) {
          return {
            ...item,
            isCancelled: true
          }
        }
        return item
      })
    default:
      return state
  }
}
