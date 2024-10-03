const github = require('@actions/github');
const core = require('@actions/core');

async function run() {
  try {
    const token = process.env.GITHUB_TOKEN;
    const octokit = github.getOctokit(token);

    const context = github.context;
    const issueNumber = context.issue.number;
    const owner = context.repo.owner;
    const repo = context.repo.repo;
    const commentAuthor = context.payload.comment.user.login;

    // ラベルを決定
    let label;
    switch (commentAuthor) {
      case 'Aさん':
        label = 'Aラベル';
        break;
      case 'Bさん':
        label = 'Bラベル';
        break;
      case 'Cさん':
        label = 'Cラベル';
        break;
      default:
        label = 'その他';
    }

    // ラベルを追加
    await octokit.rest.issues.addLabels({
      owner,
      repo,
      issue_number: issueNumber,
      labels: [label]
    });

    console.log(`ラベル "${label}" をイシュー #${issueNumber} に追加しました。`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
