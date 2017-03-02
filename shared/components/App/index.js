import React from 'react'
import Switch from 'react-router-dom/Switch'
import Route from 'react-router-dom/Route'

import AsyncHome from 'shared/components/AsyncHome'
import AsyncBlog from 'shared/components/AsyncBlog/Blog'
import AsyncAbout from 'shared/components/AsyncAbout'
import Error404 from 'shared/components/Error404'
import Header from 'shared/components/Header'

import './style.css'

function App() {
  return (
    <div style={{ padding: '10px' }}>
      <Header />
      <Switch>
        <Route exact path="/" component={AsyncHome} />
        <Route path="/blog" component={AsyncBlog} />
        <Route path="/about" component={AsyncAbout} />
        <Route component={Error404} />
      </Switch>
    </div>
  )
}

export default App
