
# GitHub GraphQL API
Demonstraing usage of GitHub GraphQL API.

You will need to [create a PAT(Personal Access Token)](https://github.com/settings/tokens/new?scopes=repo) to use most methods.

## What is GraphQL?
GraphQL is a query language that traverses your data graph to produce a query result tree.

[![Watch the video](https://img.youtube.com/vi/7wzR4Ig5pTI/maxresdefault.jpg)](https://youtu.be/7wzR4Ig5pTI)

## What is the [GitHub GraphQL API](https://docs.github.com/en/graphql)?
To create integrations, retrieve data, and automate your workflows, use the GitHub GraphQL API. The GitHub GraphQL API offers more precise and flexible queries than the GitHub REST API.

# GitHub API Clients
Below are of the clients that can be used to interact with the GitHub GraphQL API.

The list is broken up into the following categories:
- [GUI](#gui)
- [Terminal](#terminal)
- [JavaScript](#javascript)


This list is not exahustive. You can find clients for any language at [graphql.org](https://graphql.org/code/).

## GUI

### Explorer GraphiQL
See [Using the Explorer](https://docs.github.com/en/graphql/guides/using-the-explorer).

[![Explorer](https://user-images.githubusercontent.com/22425467/156842494-b6410489-46ed-403f-9097-2d8b2b354d3c.png)](https://docs.github.com/en/graphql/overview/explorer)

## Terminal

### GitHub CLI
See [github.com/cli/cli](https://github.com/cli/cli#github-cli) and [cli.github.com/manual](https://cli.github.com/manual/gh_api#examples).
```bash
gh api graphql -f query='query {
  viewer {
    login
  }
}'
```

### Curl
You know curl.
```bash
curl -H "Authorization: bearer ${GITHUB_TOKEN}" -X POST -d " \
 { \
   \"query\": \"query { viewer { login }}\" \
 } \
" https://api.github.com/graphql
```
## Javascript

### Octokit Graphql.js
See [github.com/octokit/graphql.js](https://github.com/octokit/graphql.js/#graphqljs).
```js
import { Octokit } from "octokit";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const result = await octokit.graphql(`query { 
    viewer { 
      login
    }
}`)
console.log(result);
```
#### Bonus Actions Usage
You can use [github-script](https://github.com/actions/github-script#run-custom-graphql-queries) to easily implement octokit in your Actions workflows.
```yaml
jobs:
  viewer_login:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/github-script@v6
        with:
          script: |
            const query = `{ 
                viewer { 
                  login
                }
            }`;
            const result = await github.graphql(query)
            console.log(result)
```

### graphql-request
See [npmjs.com/package/graphql-request](https://www.npmjs.com/package/graphql-request).
```js
import { request, gql } from 'graphql-request'

request({
    url: 'https://api.github.com/graphql',
    document: gql`{ 
        viewer { 
          login
        }
    }`,
    requestHeaders: {
        Authorization: `bearer ${process.env.GITHUB_TOKEN}`
    }
}).then((data) => console.log(data))
```

### Apollo
[apollo/client](https://www.npmjs.com/package/@apollo/client) is very popular and primarily for the web. It is heavly used for React projects.

Here is a NodeJS implementation.
```js
import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client/core";
import { setContext } from '@apollo/link-context';
import fetch from 'cross-fetch';

const httpLink = new HttpLink({
    uri: 'https://api.github.com/graphql',
    fetch
});

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: `bearer ${process.env.GITHUB_TOKEN}`
        }
    }
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
});

client.query({
    query: gql`{ 
        viewer { 
          login
        }
    }`
}).then(result => console.log(result.data));
```

## Code Generation

### Graphql Code Generator
[graphql-code-generator](https://www.graphql-code-generator.com/) has [plugins](https://www.graphql-code-generator.com/plugins) to generate code for most languages.
