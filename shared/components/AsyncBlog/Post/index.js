import React from 'react'
import Helmet from 'react-helmet'
import { connect } from '@lab009/teide'
import DataComponent from '@lab009/teide-data-view'

import actions from 'shared/core/actions'

class Post extends DataComponent {
  resolveData() {
    actions.blog.getPost({
      subset: 'post',
      params: {
        id: 1,
      },
    })
  }

  renderData({ post }) {
    return (
      <div>
        <Helmet title={`Posts - ${post.get('title')}`} />

        <h1>{post.get('title')}</h1>
        <div>
          {post.get('body')}
        </div>
        <div>
          Foo
        </div>
      </div>
    )
  }
}


export default connect({ post: 'api.subsets.post' })(Post)
