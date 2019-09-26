const core = require('@actions/core');
const github = require('@actions/github');

(async () => {
    try {
        const labelsToAdd = JSON.parse(core.getInput('add'));
        console.log(`Labels to add: ${labelsToAdd}`);
        const labelsToRemove = JSON.parse(core.getInput('remove'));
        console.log(`Labels to remove: ${labelsToAdd}`);

        const githubToken = core.getInput('githubToken');
        const octokit = new github.GitHub(githubToken);
        const context = github.context;
        
        await octokit.issues.addLabels({
            repo: context.repo,
            owner: context.repo.owner,
            issue_number: context.payload.issue.number,
            labels: labelsToAdd
        });

        // labelsToRemove.forEach(label => {
        //     octokit.issues.removeLabels({
        //         repo: context.repo,
        //         owner: context.repo.owner,
        //         issue_number: context.payload.issue.number,
        //         label,
        //     }); 
        // });
    } catch (error) {
        core.setFailed(error.message)
    }
})();