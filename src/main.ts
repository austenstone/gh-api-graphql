import runApolloClient from './apollo/apollo';
import runGraphQLRequest from './graphql-request/graphql-request';
import run from './octokit/octokit';

run();

runGraphQLRequest();

runApolloClient();