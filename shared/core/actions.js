import { createActions, createReducerActions } from '@lab009/teide'

import localActions from 'shared/actions'
import localReducers from 'shared/reducers'

let _dispatch = null

const lazyDispatch = (action) => {
  if (typeof _dispatch !== 'function') throw new Error('Actions not initialized')
  return _dispatch(action)
}

export const initActions = (dispatch) => { _dispatch = dispatch }

export default createActions({
  ...localActions,
  ...createReducerActions(localReducers),
}, lazyDispatch)
