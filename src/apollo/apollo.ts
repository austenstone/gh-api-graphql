import { ApolloClient, InMemoryCache, gql, HttpLink } from '@apollo/client/core'
import { setContext } from '@apollo/link-context'
import fetch from 'cross-fetch'

const runApolloClient = async (): Promise<void> => {
  const httpLink = new HttpLink({
    uri: 'https://api.github.com/graphql',
    fetch,
  })

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: `bearer ${process.env.GITHUB_TOKEN}`,
      },
    }
  })

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  })

  client.query({
    query: gql`{ 
            viewer { 
              login
            }
        }`,
  }).then((result) => console.log(result.data))
}

export default runApolloClient
