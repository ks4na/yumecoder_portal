import { combineReducers } from 'redux'
import taskState, { TaskState } from './task'
import localeState, { LocaleState } from './locale'
import themeState, { ThemeState } from './theme'

declare module 'react-redux' {
  interface DefaultRootState {
    localeState: LocaleState
    taskState: TaskState
    themeState: ThemeState
  }
}

export default combineReducers({ taskState, localeState, themeState })
