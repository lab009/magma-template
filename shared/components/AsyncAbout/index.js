import { createAsyncComponent } from '@lab009/splitter'

export default createAsyncComponent({
  resolve: () => System.import('./About'),
  ssrMode: 'boundary',
  name: 'AsyncAbout',
})
