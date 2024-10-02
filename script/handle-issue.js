const fs = require('fs');
const github = require('@actions/github');
const core = require('@actions/core');

// GitHub Actionsの環境変数からイベントデータを読み込む
const eventPath = process.env.GITHUB_EVENT_PATH;
const eventData = JSON.parse(fs.readFileSync(eventPath, 'utf8'));

// イシューのタイトルと問い合わせ種類を取得
const issueTitle = eventData.issue.title;
let inquiryTypeMatch = eventData.issue.body.match(/問い合わせ種類:\s*(.*)/);
let inquiryType = inquiryTypeMatch ? inquiryTypeMatch[1] : '問い合わせ種類が見つかりませんでした';

// コメントを追加するための関数
async function addComment() {
  const token = process.env.GITHUB_TOKEN;
  const octokit = github.getOctokit(token);

  const context = github.context;
  const issueNumber = context.issue.number;
  const owner = context.repo.owner;
  const repo = context.repo.repo;

  const commentBody = `問い合わせ種類: ${inquiryType}`;

  await octokit.issues.createComment({
    owner,
    repo,
    issue_number: issueNumber,
    body: commentBody
  });
}

// コメントを追加
addComment().catch(error => {
  core.setFailed(error.message);
});
