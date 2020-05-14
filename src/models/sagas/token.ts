import { all, takeLatest, call, takeEvery } from 'redux-saga/effects'
import {
  SAGA_SAVE_TOKENS_TO_LOCAL,
  SagaSaveTokensToLocalAction,
  SAGA_CLEAR_TOKENS,
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

// clear tokens
export function* clearTokens(): Generator {
  yield call([localStorage, 'removeItem'], 'accessToken')
  yield call([localStorage, 'removeItem'], 'refreshToken')
}

export function* watchSagaClearTokens(): Generator {
  yield takeEvery(SAGA_CLEAR_TOKENS, clearTokens)
}

export default function* tokenSaga(): Generator {
  yield all([watchSagaSaveTokensToLocal(), watchSagaClearTokens()])
}
