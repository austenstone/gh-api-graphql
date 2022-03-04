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


const run = async (): Promise<void> => {
};

export default run;