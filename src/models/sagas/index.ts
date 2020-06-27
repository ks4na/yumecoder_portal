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
import paperSaga from './tests/paper'
import testPageSaga from './tests/testPage'
import testResultSaga from './tests/testResult'
import testAnalysisSaga from './tests/testAnalysis'

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
    paperSaga(),
    testPageSaga(),
    testResultSaga(),
    testAnalysisSaga(),
  ])
}
