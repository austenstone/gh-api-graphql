# GitHub GraphQL
Demonstraing usage of GitHub GraphQL API.

You will need to [create a PAT(Personal Access Token)](https://github.com/settings/tokens/new?scopes=repo) to use this API.

## What is GraphQL?
Great introduction video on GraphQL.

[![Watch the video](https://img.youtube.com/vi/7wzR4Ig5pTI/maxresdefault.jpg)](https://youtu.be/7wzR4Ig5pTI)

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
curl -H "Authorization: bearer token" -X POST -d " \
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

const run = async (): Promise<void> => {
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    const result = await octokit.graphql(`query { 
        viewer { 
          login
        }
    }`)

    console.log(result);
};

export default run;
```

### graphql-request
See [npmjs.com/package/graphql-request](https://www.npmjs.com/package/graphql-request).
```js
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
            Authorization: `bearer ${process.env.GITHUB_TOKEN}`
        }
    }).then((data) => console.log(data))
};

export default runGraphQLRequest;
```
