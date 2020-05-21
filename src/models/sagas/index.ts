import { all } from 'redux-saga/effects'
import taskSaga from './task'
import localSaga from './locale'
import themeSaga from './theme'
import loginSaga from './login'
import tokenSaga from './token'
import registSaga from './regist'
import pwdResetSaga from './pwdReset'
import testMenuSaga from './tests/menu'
import logoutSaga from './logout'
import userSaga from './user'
import shortcutListCountSaga from './home/shortcutListCount'

export default function* rootSaga(): Generator {
  yield all([
    taskSaga(),
    localSaga(),
    themeSaga(),
    loginSaga(),
    tokenSaga(),
    registSaga(),
    pwdResetSaga(),
    testMenuSaga(),
    logoutSaga(),
    userSaga(),
    shortcutListCountSaga(),
  ])
}
