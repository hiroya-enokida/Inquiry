const fs = require('fs');

// GitHubイベントデータを読み込む
const eventData = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));

// 更新者のアカウント名を取得
const updaterName = eventData.sender.login;

console.log(`Chat updater name: ${updaterName}`);
