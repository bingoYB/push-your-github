const core = require('@actions/core')
import { init, deploy } from "./git";
/** Initializes and runs the action. */
(async function () {
  try {
    await init();
    await deploy();
  } catch (error) {
    console.log("The deployment encountered an error. ❌");
    core.setFailed(error.message);
  } finally {
    console.log("Completed Deployment ✅");
  }
})();