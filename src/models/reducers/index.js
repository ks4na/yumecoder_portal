import { combineReducers } from 'redux'
import tasks from './task.js'
import locale from './locale.js'

export default combineReducers({ tasks, locale })
