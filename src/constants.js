const core = require('@actions/core')

// const github = require('@actions/github')

// const { actor } = github.context.payload

const action = {
  gitHubToken: core.getInput("GITHUB_TOKEN"),
  push_branch: core.getInput("PUSH_BRANCH"),
  force_push: core.getInput("FORCE_PUSH")||'',
  name: "GitHub-Push-Action",
  email: `${process.env.GITHUB_ACTOR || "github-pages-deploy-action"}@users.noreply.github.com`
}

exports.action = action

exports.repositoryPath = `https://${process.env.GITHUB_ACTOR}:${action.gitHubToken}@github.com/${process.env.GITHUB_REPOSITORY}.git`

exports.workspace = process.env.GITHUB_WORKSPACE;