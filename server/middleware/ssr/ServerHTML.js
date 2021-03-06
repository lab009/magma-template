/**
 * This module is responsible for generating the HTML page response for
 * the react application middleware.
 */

/* eslint-disable react/no-danger */
/* eslint-disable react/no-array-index-key */

import React, { Children, PropTypes } from 'react'
import serialize from 'serialize-javascript'
import config from '@lab009/magma-config'
import ClientConfig from '@lab009/magma-config/ClientConfig'
import ifElse from '@lab009/magma-utils/logic/ifElse'
import removeNil from '@lab009/magma-utils/arrays/removeNil'

import HTML from 'shared/components/HTML'

import getClientBundleEntryAssets from './getClientBundleEntryAssets'

function KeyedComponent({ children }) {
  return Children.only(children)
}

// Resolve the assets (js/css) for the client bundle's entry chunk.
const clientEntryAssets = getClientBundleEntryAssets()

function stylesheetTag(stylesheetFilePath) {
  return (
    <link
      href={stylesheetFilePath}
      media="screen, projection"
      rel="stylesheet"
      type="text/css"
    />
  )
}

function scriptTag(jsFilePath) {
  return <script type="text/javascript" src={jsFilePath} />
}

function ServerHTML(props) {
  const {
    asyncComponents,
    helmet,
    nonce,
    reactAppString,
  } = props

  // Creates an inline script definition that is protected by the nonce.
  const inlineScript = body => (
    <script
      nonce={nonce}
      type="text/javascript"
      dangerouslySetInnerHTML={{ __html: body }}
    />
  )

  const headerElements = removeNil([
    ...ifElse(helmet)(() => helmet.meta.toComponent(), []),
    ...ifElse(helmet)(() => helmet.link.toComponent(), []),
    ifElse(clientEntryAssets && clientEntryAssets.css)(
      () => stylesheetTag(clientEntryAssets.css),
    ),
    ...ifElse(helmet)(() => helmet.style.toComponent(), []),
  ])

  const bodyElements = removeNil([
    // Binds the client configuration object to the window object so
    // that we can safely expose some configuration values to the
    // client bundle that gets executed in the browser.
    <ClientConfig nonce={nonce} />,
    // Bind our async components state so the client knows which ones
    // to initialise so that the checksum matches the server response.
    ifElse(asyncComponents)(
      () => inlineScript(
        `window.${asyncComponents.STATE_IDENTIFIER}=${serialize(asyncComponents.state)};`,
      ),
    ),
    // Enable the polyfill io script?
    // This can't be configured within a react-helmet component as we
    // may need the polyfill's before our client JS gets parsed.
    ifElse(config('polyfillIO.enabled'))(
      () => scriptTag(config('polyfillIO.url')),
    ),
    // When we are in development mode our development server will
    // generate a vendor DLL in order to dramatically reduce our
    // compilation times.  Therefore we need to inject the path to the
    // vendor dll bundle below.
    ifElse(process.env.BUILD_FLAG_IS_DEV && config('bundles.client.devVendorDLL.enabled'))(
      () => scriptTag(
        `${config('bundles.client.webPath')}${config('bundles.client.devVendorDLL.name')}.js?t=${Date.now()}`,
      ),
    ),
    ifElse(clientEntryAssets && clientEntryAssets.js)(
      () => scriptTag(clientEntryAssets.js),
    ),
    ...ifElse(helmet)(
      () => helmet.script.toComponent(),
      [],
    ),
  ])

  return (
    <HTML
      title={config('htmlPage.defaultTitle')}
      description={config('htmlPage.description')}
      appBodyString={reactAppString}
      headerElements={
        headerElements.map((x, idx) => <KeyedComponent key={idx}>{x}</KeyedComponent>)
      }
      bodyElements={
        bodyElements.map((x, idx) => <KeyedComponent key={idx}>{x}</KeyedComponent>)
      }
    />
  )
}

ServerHTML.propTypes = {
  asyncComponents: PropTypes.shape({
    state: PropTypes.object.isRequired,
    STATE_IDENTIFIER: PropTypes.string.isRequired,
  }),
  // eslint-disable-next-line react/forbid-prop-types
  helmet: PropTypes.object,
  nonce: PropTypes.string,
  reactAppString: PropTypes.string,
}

// EXPORT

export default ServerHTML
