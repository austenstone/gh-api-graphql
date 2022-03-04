import { Octokit } from "octokit";
const octokit = new Octokit({ auth: `personal-access-token123` });
const { data: { login }, } = await octokit.rest.users.getAuthenticated();
console.log("Hello, %s", login);
