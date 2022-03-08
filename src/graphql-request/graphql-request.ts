import { request, gql } from 'graphql-request'

const runGraphQLRequest = async (): Promise<void> => {
  const query = gql`{ 
        viewer { 
            login
        }
    }`

  request({
    url: 'https://api.github.com/graphql',
    document: query,
    requestHeaders: {
      Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
    },
  }).then((data) => console.log(data))
}

export default runGraphQLRequest
