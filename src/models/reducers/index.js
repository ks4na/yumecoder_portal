import { combineReducers } from 'redux'
import tasks from './task.js'
import locale from './locale.js'
import theme from './theme.js'

export default combineReducers({ tasks, locale, theme })
