import React, { PropTypes } from 'react'
import serialize from 'serialize-javascript'

export const STATE_IDENTIFIER = '__APP_STATE__'

function InitialState({ state, nonce }) {
  const serializedInitialState = serialize(state)

  return (
    <script
      type="text/javascript"
      nonce={nonce}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `window.${STATE_IDENTIFIER}=${serializedInitialState}`,
      }}
    />
  )
}

InitialState.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  state: PropTypes.object.isRequired,
  nonce: PropTypes.string.isRequired,
}

export default InitialState
