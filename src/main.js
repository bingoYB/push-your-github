const git = require('./git')
const core = require('@actions/core')
/** Initializes and runs the action. */

async function start() {
  try {
    await git.init()
    await git.push()
  } catch (error) {
    console.log("The deployment encountered an error. ❌")
    core.setFailed(error.message)
  } finally {
    console.log("Completed Deployment ✅")
  }
}

start()
