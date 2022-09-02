const { default: axios } = require("axios");

module.exports = function report(data) {
  try {
    const { numTotalTests, numPendingTests, numFailedTests, numPassedTests } =
      data;
    if (numTotalTests > 0) {
      const [github, repo] = process.env.GITHUB_REPOSITORY.split('/');
      axios.post(
        "https://learning.soyhenry.com/toolbox/checkpoint-report/report/check",
        {
          numTotalTestSuites: numTotalTests,
          numPassedTestSuites: numPassedTests,
          numFailedTestSuites: numPendingTests + numFailedTests,
          repo,
          github,
          githubsha: process.env.GITHUB_SHA,
        }).then(() => {
          console.log("The result was uploaded correctly")
        },() => {
          console.error("The result could not be uploaded")
        });
    }
  } catch (error) {
    console.error(error);
  }
  data.success = true;
  return data;
};