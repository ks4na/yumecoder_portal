import { createStore, applyMiddleware, DeepPartial } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
})

// create sagaMiddleware
const sagaMiddleware = createSagaMiddleware()

export default function configureStore<S>(preloadedState: DeepPartial<S>) {
  // mount sagaMiddleware on the store
  const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  )

  // run the saga
  sagaMiddleware.run(rootSaga)

  return store
}
