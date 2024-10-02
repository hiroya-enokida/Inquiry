// handle-issue.js
const issue = require(process.env.GITHUB_EVENT_PATH);
console.log('Issue created: ' + issue.issue.title);
