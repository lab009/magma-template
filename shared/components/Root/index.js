import React, { Component } from 'react'

import App from 'shared/components/App'

class Root extends Component {
  componentWillMount() {
    console.time('First Render Time')
  }

  componentDidMount() {
    console.timeEnd('First Render Time')
  }

  render() {
    return (
      <App />
    )
  }
}

export default Root
