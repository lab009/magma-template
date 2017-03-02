import Immutable from 'immutable'
import { STATE_IDENTIFIER } from 'shared/components/InitialState'

export default Immutable.fromJS({
  ...(window[STATE_IDENTIFIER] || {}),
})
