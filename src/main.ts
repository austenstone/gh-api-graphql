import runApolloClient from './apollo/apollo';
import runGraphQLRequest from './graphql-request/graphql-request';
import runOctoKit from './octokit/octokit';

runOctoKit();

runGraphQLRequest();

runApolloClient();