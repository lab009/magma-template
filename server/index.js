import express from 'express'
import compression from 'compression'
import { resolve as pathResolve } from 'path'
import appRootDir from 'app-root-dir'
import config from '@lab009/magma-config'
import { createReactSSR, security, clientBundle, serviceWorker, offlinePage, errorHandlers } from '@lab009/magma-server'

import Root from 'shared/components/Root'
import HTML from 'shared/components/HTML'

// Create our express based server.
const app = express()

// Don't expose any software information to potential hackers.
app.disable('x-powered-by')

// Security middlewares.
app.use(...security)

// Gzip compress the responses.
app.use(compression())

// Register our service worker generated by our webpack config.
// We do not want the service worker registered for development builds, and
// additionally only want it registered if the config allows.
if (!process.env.BUILD_FLAG_IS_DEV && config('serviceWorker.enabled')) {
  app.get(`/${config('serviceWorker.fileName')}`, serviceWorker)
  app.get(
    `${config('bundles.client.webPath')}${config('serviceWorker.offlinePageFileName')}`,
    offlinePage,
  )
}

// Configure serving of our client bundle.
app.use(config('bundles.client.webPath'), clientBundle)

// Configure static serving of our "public" root http path static files.
// Note: these will be served off the root (i.e. '/') of our application.
app.use(express.static(pathResolve(appRootDir.get(), config('publicAssetsPath'))))

// The React application middleware.
app.get('*', createReactSSR(Root, HTML))

// Error Handler middlewares.
app.use(...errorHandlers)

// Create an http listener for our express app.
const listener = app.listen(config('port'), config('host'), () =>
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${config('port')}`),
)

// We export the listener as it will be handy for our development hot reloader,
// or for exposing a general extension layer for application customisations.
export default listener
