import { all, takeLatest, call } from 'redux-saga/effects'
import {
  SAGA_SAVE_TOKENS_TO_LOCAL,
  SagaSaveTokensToLocalAction,
} from '../actions'

function* saveTokensToLocal(action: SagaSaveTokensToLocalAction): Generator {
  const { accessToken, refreshToken } = action.payload
  if (accessToken) {
    yield call([localStorage, 'setItem'], 'accessToken', accessToken)
  }
  if (refreshToken) {
    yield call([localStorage, 'setItem'], 'refreshToken', refreshToken)
  }
}

function* watchSagaSaveTokensToLocal(): Generator {
  yield takeLatest(SAGA_SAVE_TOKENS_TO_LOCAL, saveTokensToLocal)
}

export default function* tokenSaga(): Generator {
  yield all([watchSagaSaveTokensToLocal()])
}
