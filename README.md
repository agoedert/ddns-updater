# ddns-updater
ddns-updater it's an job intented to update one regitry on google cloud DNS, with 
AWS tools, AWS codepipeline and AWS codebuild

## Prerequisites
- [Set up authentication with a service account](https://cloud.google.com/docs/authentication/getting-started) for api usage of Google Cloud DNS
- install Docker on your local maquine

## Description
The pipeline it's intented to update the push of our code to a new image on the registry on REPOSITORY_URI (buildspec.yaml)

## Local Build
- first build the Docker Image from [Local-CodeBuild](https://github.com/aws/aws-codebuild-docker-images.git)
```
git clone https://github.com/aws/aws-codebuild-docker-images.git
cd aws-codebuild-docker-images
cd ubuntu/java/openjdk-8
docker build -t aws/codebuild/java:openjdk-8 .
```
- then run locally
```
./codebuild_build.sh -i aws/codebuild/java:openjdk-8 -a ./artifcats -s ./
```

## AWS account(Production) Build

