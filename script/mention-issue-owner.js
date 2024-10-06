const { Octokit } = require("@octokit/rest");
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

async function run() {
  const owner = 'リポジトリのオーナー名';
  const repo = 'リポジトリ名';

  // "回答済み"ラベルが付いたissueを取得
  const { data: issues } = await octokit.issues.listForRepo({
    owner,
    repo,
    labels: '回答済み',
    state: 'open'
  });

  const now = new Date();

  for (const issue of issues) {
    const lastComment = await octokit.issues.listComments({
      owner,
      repo,
      issue_number: issue.number,
      per_page: 1,
      sort: 'updated',
      direction: 'desc'
    });

    if (lastComment.data.length > 0) {
      const lastCommentDate = new Date(lastComment.data[0].updated_at);
      const diffMinutes = (now - lastCommentDate) / 1000 / 60;

      if (diffMinutes > 3) {
        await octokit.issues.createComment({
          owner,
          repo,
          issue_number: issue.number,
          body: `@${issue.user.login} 回答未確認です。確認してリアクションお願いします。`
        });
      }
    }
  }
}

run().catch(error => {
  console.error(error);
  process.exit(1);
});
