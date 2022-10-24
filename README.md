# Github Social Feed - Lambda Function

This is AWS Lambda function used in the [Github Social Feed Project](https://github.com/jordanholtdev/github-social-feed).

## Functionality

* Daily scheduled Lambda function pulls data from Github REST API
* Modifies data into single JSON file
* Pushes data into s3 Bucket where the front-end then reads and presents the data

### Technologies

* [octokit.js](https://github.com/octokit/octokit.js/) library
* [Node.js](https://nodejs.org/en/)
* [AWS Lambda](https://aws.amazon.com/lambda/)
* [AWS S3](https://aws.amazon.com/s3/)
