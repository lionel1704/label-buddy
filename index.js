const { Toolkit } = require('actions-toolkit')

// Run your GitHub Action!
Toolkit.run(async tools => {
  const issue = tools.context.issue;
  const args = tools.arguments;
  console.log(args);
  const addAction = await tools.github.issues.addLabels({
    ...tools.context.repo,
    issue_number: issue.number,
    labels: ["testing"]
  });
  const removeAction = await tools.github.issues.removeLabel({
    ...tools.context.repo,
    issue_number: issue.number,
    labels: ["testing"]
  });
  tools.exit.success('We did it!')
}, { event: 'issues' });
