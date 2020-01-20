// import { exec } from "@actions/exec"
const exec = require("@actions/exec")
// import {repositoryPath,action,workspace} from './constants'
const {action,repositoryPath,workspace} = require('./constants')
const core = require('@actions/core')


/** Wrapper around the GitHub toolkit exec command which returns the output.
 * Also allows you to easily toggle the current working directory.
 * @param {String} cmd = The command to execute.
 * @param {String} cwd - The current working directory.
 * @returns {Promise} - The output from the command.
 */
async function execute(cmd, cwd){
  let output = ""
  await exec.exec(cmd, [], {
    cwd,
    listeners: {
      stdout: (data) => {
        output += data.toString().trim()
      }
    }
  })

  return Promise.resolve(output)
}

exports.init = async function init(){
  try {
    if (!action.gitHubToken) {
      return core.setFailed(
        "请提供github token用于提交凭证"
      )
    }
    await execute(`git init`, workspace)
    await execute(`git config user.name ${action.name}`, workspace)
    await execute(`git config user.email ${action.email}`, workspace)
  } catch (error) {
    core.setFailed(`There was an error initializing the repository: ${error}`)
  } finally {
    return Promise.resolve("Initialization step complete...")
  }
}

exports.push = async function push() {
  const hasFilesToCommit = await execute(
    `git status --porcelain`,
    workspace
  )

  if (!hasFilesToCommit){
    console.log("There is nothing to commit. Exiting... ✅")
    return Promise.resolve()
  }
  await execute(`git add -A`, workspace)
  await execute(
    `git commit -m "push from action."`,
    workspace
  )
  await execute(`git push ${action.force_push} ${repositoryPath} ${action.push_branch}`, workspace)
  return Promise.resolve('push success');
}