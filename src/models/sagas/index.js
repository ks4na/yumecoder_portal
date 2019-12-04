import { all } from 'redux-saga/effects'
import taskSaga from './task.js'

export default function* rootSaga() {
  yield all([taskSaga()])
}
