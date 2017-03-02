import React from 'react'
import { render } from 'react-dom'
import BrowserRouter from 'react-router-dom/BrowserRouter'
import { withAsyncComponents } from '@lab009/splitter'

import Root from 'shared/components/Root'
import ReactHotLoader from '@lab009/magma-scripts/components/ReactHotLoader'

// Get the DOM Element that will host our React application.
const container = document.querySelector('#app')

/**
 * Renders the given React Application component.
 */
function renderApp(TheApp) {
  // Firstly, define our full application component, wrapping the given
  // component app with a browser based version of react router.
  const app = (
    <ReactHotLoader>
      <BrowserRouter>
        <TheApp />
      </BrowserRouter>
    </ReactHotLoader>
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
require('./registerServiceWorker')

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
