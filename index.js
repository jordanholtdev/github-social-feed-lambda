const { Octokit } = require("octokit")
const aws = require('aws-sdk');

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const s3 = new aws.S3();

async function getRepoIssues(owner, repo) {
    const { data } = await octokit.request('GET /repos/{owner}/{repo}/issues/comments', {
        owner: owner,
        repo: repo,
        sort: "updated",
        direction: "desc"
    })
    return data
}

exports.handler = async (event, context, handler) => {
    let issues;
    const bucket = process.env.BUCKET_NAME;
    const key = "issues.json";

    const res = await Promise.all([getRepoIssues("aws", "aws-cli"), getRepoIssues("vercel", "next.js"), getRepoIssues("facebook", "react"), getRepoIssues("ansible", "ansible")]).then(
        results => {
            issues = JSON.stringify({
                aws: results[0],
                next: resulst[1],
                react: results[2],
                ansible: results[3]
            })
        }
    )

    try {
        const destparams = {
            Bucket: bucket,
            Key: key,
            Body: issues,
            ContentType: "application/json"
        }
        const putResult = await s3.putObject(destparams).promise();

    } catch (e) {
        console.log(e)
        console.log("upload error", e)
    }
    return issues
}



