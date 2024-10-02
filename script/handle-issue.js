name: Issue Handler

on:
  issues:
    types: [opened]

jobs:
  handle-issue:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '14'

      - name: Run JavaScript
        run: node ./scripts/handle-issue.js
