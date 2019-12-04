import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers/index.js'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas/index.js'

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
})

// create sagaMiddleware
const sagaMiddleware = createSagaMiddleware()

export default function configureStore(preloadedState) {
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
