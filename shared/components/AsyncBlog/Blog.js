import React from 'react'
import Helmet from 'react-helmet'
import Link from 'react-router-dom/Link'
import Route from 'react-router-dom/Route'

import Post from './Post'

function Blog() {
  return (
    <div>
      <Helmet title="Blog" />
      <h1>Blog</h1>
      <ul>
        <li><Link to="/blog/1">Post 1</Link></li>
        <li><Link to="/blog/2">Post 2</Link></li>
      </ul>
      <Route path="/blog/:id" component={Post} />
    </div>
  )
}

export default Blog
