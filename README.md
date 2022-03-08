
# GitHub GraphQL API
Demonstraing usage of GitHub GraphQL API.

You will need to [create a PAT(Personal Access Token)](https://github.com/settings/tokens/new?scopes=repo) to use most methods.

## What is GraphQL?
GraphQL is a query language that traverses your data graph to produce a query result tree.

See [GraphQL Basics - Build an app with the SpaceX API](https://youtu.be/7wzR4Ig5pTI)<br>
<a href="https://youtu.be/7wzR4Ig5pTI">
  <img src="https://img.youtube.com/vi/7wzR4Ig5pTI/maxresdefault.jpg" width="300px">
</a>

Read [Introduction to GraphQL](https://docs.github.com/en/graphql/guides/introduction-to-graphql).

## What is the GitHub GraphQL API?
To create integrations, retrieve data, and automate your workflows, use the [GitHub GraphQL API](https://docs.github.com/en/graphql).<br>The GitHub GraphQL API offers more precise and flexible queries than the GitHub REST API.

### Endpoint

There is only one endpoint for the GitHub GraphQL API.
```
https://api.github.com/graphql
```
All requests to this endpoint must contain an authorization header.
```
Authorization: Bearer ghp_PAT_HERE
```

# GitHub API Clients
Below are of the clients that can be used to interact with the GitHub GraphQL API.

The list is broken up into the following categories:
- [GUI](#gui)
- [Terminal](#terminal)
- [JavaScript](#javascript)

This list is not exhaustive. You can find clients for any language at [graphql.org](https://graphql.org/code/).

For sample queries see [GitHub GraphQL Query Samples](https://github.com/github/platform-samples/tree/master/graphql).

You must provide a special `Accept` header to utilize upcoming features and changes. See [Schema previews](https://docs.github.com/en/graphql/overview/schema-previews).

## GUI

### Explorer GraphiQL
Use the [GraphiQL Explorer](https://docs.github.com/en/graphql/overview/explorer) built into GitHub's documentation or use the official [Online GraphiQL](https://graphiql-online.com/).<br>
Read more on [Using the Explorer](https://docs.github.com/en/graphql/guides/using-the-explorer).

<a href="https://docs.github.com/en/graphql/overview/explorer">
  <img width="400px" src="https://user-images.githubusercontent.com/22425467/156842494-b6410489-46ed-403f-9097-2d8b2b354d3c.png">
</a>

### Insomnia
[Insomnia](https://insomnia.rest/) is an all purpose API Client and has a great GraphQL interface.

<a href="https://insomnia.rest/">
  <img width="400px" src="https://user-images.githubusercontent.com/22425467/157262174-63278a74-a9ea-45d1-800b-0da8210b4fb3.png">
</a>

### Postman
[Postman](https://www.postman.com/) is an incredibly popular all purpose API Client with GraphQL support.

<a href="https://www.postman.com/">
  <img width="400px" src="https://user-images.githubusercontent.com/22425467/157262835-5e81f5b9-1ec4-4b40-842c-433ccd5445d8.png">
</a>


### GraphQL Playground
[graphql-playground](https://github.com/graphql/graphql-playground) was [deprecated](https://graphql.org/blog/2020-04-03-web-based-graphql-ides-for-the-win/) in favor of web-based IDEs like GraphiQL. Still a great tool.

<a href="https://github.com/graphql/graphql-playground">
  <img width="400px" src="https://user-images.githubusercontent.com/22425467/157260489-bae642ce-2b4d-4c5c-946b-a1efde501124.png">
</a>

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
console.log(result)
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
            const result = await octokit.graphql(`query { 
                viewer { 
                  login
                }
            }`)
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

# Want to learn more?

See [Advanced patterns for GitHub's GraphQL API](https://youtu.be/i5pIszu9MeM)<br>
<a href="https://youtu.be/i5pIszu9MeM">
  <img src="https://img.youtube.com/vi/i5pIszu9MeM/maxresdefault.jpg" width="300px">
</a>
