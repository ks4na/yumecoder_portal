import { combineReducers } from 'redux'
import taskState, { TaskState } from './task'
import localeState, { LocaleState } from './locale'
import themeState, { ThemeState } from './theme'
import loginState, { LoginState } from './login'

declare module 'react-redux' {
  interface DefaultRootState {
    localeState: LocaleState
    taskState: TaskState
    themeState: ThemeState
    loginState: LoginState
  }
}

export default combineReducers({
  taskState,
  localeState,
  themeState,
  loginState,
})
