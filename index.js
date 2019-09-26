const core = require('@actions/core');
const github = require('@actions/github');

try {
    const labelsToAdd = core.getInput('add');
    console.log(`Labels to add: ${labelsToAdd}`);
    const labelsToRemove = core.getInput('remove');
    console.log(`Labels to remove: ${labelsToAdd}`);

    const githubToken = core.getInput('githubToken');
    const octokit = new github.GitHub(githubToken);
    const context = github.context;
    
    octokit.issues.addLabels({
        ...context.repo,
        ...context.repo.owner,
        ...context.payload.issue,
        labels: labelsToAdd
    });

    labelsToRemove.forEach(label => {
        octokit.issues.removeLabels({
            ...context.repo,
            ...context.repo.owner,
            ...context.payload.issue.number,
            label,
        }); 
    });
} catch (error) {
    core.setFailed(error.message)
}