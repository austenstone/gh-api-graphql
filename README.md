# GitHub GraphQL

Demonstraing usage of GitHub GraphQL API.

You will need to [create a PAT(Personal Access Token)](https://github.com/settings/tokens/new?scopes=repo) to use this API.


## What is GraphQL?
Great introduction video on GraphQL.

[![Watch the video](https://img.youtube.com/vi/7wzR4Ig5pTI/maxresdefault.jpg)](https://youtu.be/7wzR4Ig5pTI)

## Explorer GraphiQL
See [Using the Explorer](https://docs.github.com/en/graphql/guides/using-the-explorer).

[![Watch the video](https://img.youtube.com/vi/7wzR4Ig5pTI/maxresdefault.jpg)](https://youtu.be/7wzR4Ig5pTI)

## Octokit Graphql.js
See [https://github.com/octokit/graphql.js/#graphqljs](https://github.com/octokit/graphql.js/#graphqljs).
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

## GitHub CLI
See [cli.github.com](https://cli.github.com/manual/gh_api#examples).
```bash
gh api graphql -f query='query {
  viewer {
    login
  }
}'
```

## Curl
```bash
curl -H "Authorization: bearer token" -X POST -d " \
 { \
   \"query\": \"query { viewer { login }}\" \
 } \
" https://api.github.com/graphql
```
