import React from 'react'
import { render } from 'react-dom'
import BrowserRouter from 'react-router-dom/BrowserRouter'
import { withAsyncComponents } from '@lab009/splitter'
import AppContainer from '@lab009/magma-scripts/client/AppContainer'

import Root from 'shared/components/Root'

// Get the DOM Element that will host our React application.
const container = document.querySelector('#app')

// Does the user's browser support the HTML5 history API?
const supportsHistory = 'pushState' in window.history

/**
 * Renders the given React Application component.
 */
function renderApp(TheApp) {
  // Firstly, define our full application component, wrapping the given
  // component app with a browser based version of react router.
  // If the user's browser doesn't support the HTML5 history API then we
  // will force full page refreshes on each page change.
  const app = (
    <AppContainer>
      <BrowserRouter forceRefresh={!supportsHistory}>
        <TheApp />
      </BrowserRouter>
    </AppContainer>
  )

  // We use the @lab009/splitter in order to support code splitting of
  // our bundle output. It's important to use this helper.
  withAsyncComponents(app).then(({ appWithAsyncComponents }) =>
    render(appWithAsyncComponents, container),
  )
}

// Execute the first render of our app.
renderApp(Root)

// This registers our service worker for asset caching and offline support.
// Keep this as the last item, just in case the code execution failed (thanks
// to react-boilerplate for that tip.)
require('@lab009/magma-scripts/client/registerServiceWorker')

// The following is needed so that we can support hot reloading our application.
if (process.env.BUILD_FLAG_IS_DEV && module.hot) {
  // Accept changes to this file for hot reloading.
  module.hot.accept('./index.js')
  // Any changes to our App will cause a hotload re-render.
  module.hot.accept(
    '../shared/components/Root',
    () => renderApp(require('../shared/components/Root').default),
  )
}
