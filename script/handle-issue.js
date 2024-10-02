// handle-issue.js
const issue = require(process.env.GITHUB_EVENT_PATH);
console.log('Issue created: ' + issue.issue.title);

// ブラウザ環境でアラートを表示する場合
if (typeof window !== 'undefined') {
  alert('テストメッセージ');
} else {
  console.log('テストメッセージ');
}
