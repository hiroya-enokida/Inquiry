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

    // アラートメッセージを出力
    if (typeof window !== 'undefined') {
      window.alert(`アラート: コメントの送信者は ${commentAuthor} です。`);
    } else {
      console.log(`アラート: コメントの送信者は ${commentAuthor} です。`);
    }

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
