import {createClient} from 'next-sanity'

export const client = createClient({
  projectId: '4iz7hax1',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-01-01',
})
