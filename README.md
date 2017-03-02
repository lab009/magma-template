<p align='center'>
  <h1 align='center'>Magma</h1>
  <p align='center'>A starter kit giving you the minimum requirements for a modern universal React application.</p>
</p>

## About

This starter kit contains all the build tooling and configuration you need to kick off your next universal React project.

## Features

  - `react` as the view.
  - `react-router` v4 as the router.
  - `express` server.
  - Very basic CSS support - it's up to you to extend it with CSS Modules etc.
  - Code splitting - easily define code split points in your source using `@lab009/splitter`.
  - Server Side Rendering.
  - Progressive Web Application ready, with offline support, via a Service Worker.
  - Long term browser caching of assets with automated cache invalidation.
  - All source is bundled using Webpack v2.
  - Full ES2017+ support - use the exact same JS syntax across the entire project. No more folder context switching! We also only use syntax that is later in the TC39 process.
  - Centralised application configuration with helpers to avoid boilerplate in your code. Also has support for environment specific configuration files.
  - Extreme live development - hot reloading of ALL changes to client/server source, with auto development server restarts when your application configuration changes.  All this with a high level of error tolerance and verbose logging to the console.
  - SEO friendly - `react-helmet` provides control of the page title/meta/styles/scripts from within your components.
  - Optimised Webpack builds via HappyPack and an auto generated Vendor DLL for smooth development experiences.
  - Tree-shaking, courtesy of Webpack.
  - Security on the `express` server using `helmet` and `hpp`.
  - Asset bundling support. e.g. images/fonts.
  - Preconfigured to support development and optimised production builds.
  - ESlint configuration.

Redux/MobX, data persistence, modern styling frameworks and all the other bells and whistles have been explicitly excluded from this starter kit.  It's up to you to decide what technologies you would like to add to your own implementation based upon your own needs.


> However, we now include a set of "feature branches", each implementing a technology on top of the clean master branch.  This provides you with an example on how to integrate said technologies, or use the branches to merge in a configuration that meets your requirements.

## Getting started

```bash
git clone https://github.com/lab009/magma-template my-project
cd my-project
yarn
yarn run development
```

Or, if you aren't using [`yarn`](https://yarnpkg.com/):

```bash
git clone https://github.com/lab009/magma-template my-project
cd my-project
npm install
npm run development
```

Now go make some changes to the `Home` component to see the tooling in action.
