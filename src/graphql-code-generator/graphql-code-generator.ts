import gql from 'graphql-tag';

const postsQueryDocument = gql`
  query Posts {
    posts {
        id
        title
        author {
          id
          firstName
          lastName
        }
    }
  }
`


const Posts = () => {
  const { data } = useCustomFetchGraphQLData(postsQueryDocument);
}