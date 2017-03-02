import { createStore, createReducer } from '@lab009/teide'

import localReducers from 'shared/reducers'

import { initActions } from '../actions'
import plugins from '../plugins'

function configureStore(initialState) {
  const store = createStore({
    plugins,
    initialState,
    reducers: [
      createReducer(localReducers),
    ],
  })

  initActions(store.dispatch)

  return store
}

export default configureStore
