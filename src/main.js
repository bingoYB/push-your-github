import { init, push } from "./git"
const core = require('@actions/core')
/** Initializes and runs the action. */
(async function () {
  try {
    await init()
    await push()
  } catch (error) {
    console.log("The deployment encountered an error. ❌")
    core.setFailed(error.message)
  } finally {
    console.log("Completed Deployment ✅")
  }
})()