import { all } from 'redux-saga/effects'
import taskSaga from './task.js'
import localSaga from './locale.js'

export default function* rootSaga() {
  yield all([taskSaga(), localSaga()])
}
