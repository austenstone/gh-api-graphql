import { Octokit } from 'octokit'

const runOctoKit = async (): Promise<void> => {
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

  const result = await octokit.graphql(`query { 
    viewer { 
      login
    }
  }`)

  console.log(result)
}

export default runOctoKit
