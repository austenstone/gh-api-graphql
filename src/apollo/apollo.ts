import {
    ApolloClient,
    InMemoryCache,
    gql,
    ApolloLink
} from "@apollo/client/core";
import { createHttpLink, HttpLink } from "apollo-link-http";
import fetch from 'cross-fetch';
import { setContext } from '@apollo/client/link/context';

const runApolloClient = async (): Promise<void> => {
    // Create the http link
    const httpLink = createHttpLink({
        uri: 'https://api.github.com/graphql',
    });

    const authLink = setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
                authorization:  `Bearer ${process.env.GITHUB_TOKEN}`
            }
        }
    });

    const client = new ApolloClient({
        cache: new InMemoryCache(),
        link: authLink.concat(httpLink as any),
        fetch: fetch
    });

    client.query({
        query: gql`query GetRates {
            rates(currency: "USD") {
                currency
            }
        }`
    }).then(result => console.log(result));
};

export default runApolloClient;