import { all } from 'redux-saga/effects'
import taskSaga from './task'
import localSaga from './locale'
import themeSaga from './theme'
import loginSaga from './login'
import tokenSaga from './token'

export default function* rootSaga(): Generator {
  yield all([taskSaga(), localSaga(), themeSaga(), loginSaga(), tokenSaga()])
}