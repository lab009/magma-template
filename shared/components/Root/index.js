import React from 'react'
import { Provider, Component, PropTypes } from '@lab009/teide'

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
      <Provider store={this.props.store}>
        <App />
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root
