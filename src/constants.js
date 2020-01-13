const core = require('@actions/core')

const github = require('@actions/github')

const { actor, repository } = github.context.payload

export const action = {
  gitHubToken: core.getInput("GITHUB_TOKEN"),
  push_branch: core.getInput("PUSH_BRANCH"),
  name: "GitHub Push Action",
  email: `${process.env.GITHUB_ACTOR || "github-pages-deploy-action"}@users.noreply.github.com`
}

export const repositoryPath = `https://${actor}:${action.gitHubToken}@github.com/${repository}.git`

export const workspace = process.env.GITHUB_WORKSPACE;