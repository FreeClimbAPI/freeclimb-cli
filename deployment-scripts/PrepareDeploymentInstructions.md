create npm personal access token from profile icon>access tokens
Make sure to verify email address in npm otherwise there will be an error 403 on publish

Create AWS S3 bucket. Then create a user with an access key that has permission to access this bucket. Give it PutObject write permission for the bucket ARN, and PutObjectACL permission for the bucket ARN.

Make sure the S3 bucket name and region in package.json match the bucket which will hold the files. Then add all the necessary secrets using the GitHub web settings as defined in the workflow.yml file.

For Homebrew, create a personal access token with repository access to the homebrew-brew repo. The repository should be initialized with the version number that is currently in the package.json, and the AWS S3 url. The sha sum can be blank. The script operates by replacing all instances of the version number in the freeclimb.rb file upon an update, and it replaces the shasum between the quotes. The new version is parsed from the changelog and the old version is parsed from the package.json
