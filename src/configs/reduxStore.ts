import { createStore, applyMiddleware, DeepPartial, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from '../models/reducers'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../models/sagas'

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
})

// create sagaMiddleware
const sagaMiddleware = createSagaMiddleware()

export function configureStore(
  preloadedState?: DeepPartial<typeof rootReducer>
): Store {
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

// create redux store
const store = configureStore()

export default store
