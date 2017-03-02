import { createAction } from '@lab009/erebus'

export const getPost = createAction({
  endpoint: ({ id }) => `https://jsonplaceholder.typicode.com/posts/${id}`,
  method: 'GET',
})
