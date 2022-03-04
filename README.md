# GitHub GraphQL

Demonstraing usage of GitHub GraphQL API.

## What is GraphQL?
[![Watch the video](https://img.youtube.com/vi/7wzR4Ig5pTI/maxresdefault.jpg)](https://youtu.be/7wzR4Ig5pTI)

## Octokit Graphql.js
See [https://github.com/octokit/graphql.js/#graphqljs](https://github.com/octokit/graphql.js/#graphqljs).
```js
const { repository } = await graphql(
  `
    {
      repository(owner: "octokit", name: "graphql.js") {
        issues(last: 3) {
          edges {
            node {
              title
            }
          }
        }
      }
    }
  `,
  {
    headers: {
      authorization: `token secret123`,
    },
  }
);
```

## GitHub CLI
See [cli.github.com](https://cli.github.com/manual/gh_api#examples).
```bash
gh api graphql --paginate -f query='
  query($endCursor: String) {
    viewer {
      repositories(first: 100, after: $endCursor) {
        nodes { nameWithOwner }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
'
```

## Curl
```bash
curl -H "Authorization: bearer token" -X POST -d " \
 { \
   \"query\": \"query { viewer { login }}\" \
 } \
" https://api.github.com/graphql
```
