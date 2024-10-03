const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const token = process.env.GITHUB_TOKEN;
    const octokit = github.getOctokit(token);
    const { context = {} } = github;
    const { issue } = context.payload;

    if (!issue) {
      throw new Error('Issue context is missing');
    }

    const { owner, repo } = context.repo;
    const labels = ['bug']; // 追加したいラベルを指定

    await octokit.issues.addLabels({
      owner,
      repo,
      issue_number: issue.number,
      labels
    });

    console.log(`Added labels to issue #${issue.number}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
