import { combineReducers } from 'redux'
import taskState, { TaskState } from './task'
import localeState, { LocaleState } from './locale'
import themeState, { ThemeState } from './theme'
import loginState, { LoginState } from './login'
import snackbarState, { SnackbarState } from './snackbar'
import registState, { RegistState } from './regist'
import pwdResetState, { PwdResetState } from './pwdReset'
import testMenuState, { TestMenuState } from './tests/menu'
import logoutState, { LogoutState } from './logout'
import userState, { UserState } from './user'
import shortcutListCountState, {
  ShortcutListCountState,
} from './home/shortcutListCount'
import paperState, { PaperState } from './tests/paper'
import testPageState, { TestPageState } from './tests/testPage'
import testResultState, { TestResultState } from './tests/testResult'

declare module 'react-redux' {
  interface DefaultRootState {
    localeState: LocaleState
    taskState: TaskState
    themeState: ThemeState
    loginState: LoginState
    snackbarState: SnackbarState
    registState: RegistState
    pwdResetState: PwdResetState
    testMenuState: TestMenuState
    logoutState: LogoutState
    userState: UserState
    shortcutListCountState: ShortcutListCountState
    paperState: PaperState
    testPageState: TestPageState
    testResultState: TestResultState
  }
}

export default combineReducers({
  taskState,
  localeState,
  themeState,
  loginState,
  snackbarState,
  registState,
  pwdResetState,
  testMenuState,
  logoutState,
  userState,
  shortcutListCountState,
  paperState,
  testPageState,
  testResultState,
})
