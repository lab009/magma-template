import { createAsyncComponent } from '@lab009/splitter'

export default createAsyncComponent({
  resolve: () => System.import('./Home'),
  ssrMode: 'boundary',
  name: 'AsyncHome',
})
