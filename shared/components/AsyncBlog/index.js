import { createAsyncComponent } from '@lab009/splitter'

export default createAsyncComponent({
  resolve: () => System.import('./Blog'),
  ssrMode: 'boundary',
  name: 'AsyncBlog',
})
