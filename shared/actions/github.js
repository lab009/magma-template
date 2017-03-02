import { createAction } from '@lab009/erebus'

export const getUser = createAction({
  endpoint: ({ name }) => `https://api.github.com/users/${name}`,
  method: 'GET',
})

export const getOrganizations = createAction({
  endpoint: ({ name }) => `https://api.github.com/users/${name}/orgs`,
  method: 'GET',
  collection: true,
})

export const getRepositories = createAction({
  endpoint: ({ name }) => `https://api.github.com/users/${name}/repos`,
  method: 'GET',
  collection: true,
})
