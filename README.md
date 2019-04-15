# ddns-updater
ddns-updater it's an job intented to update one regitry on google cloud DNS, with 
AWS tools, AWS codepipeline and AWS codebuild

## Prerequisites
- [Set up authentication with a service account](https://cloud.google.com/docs/authentication/getting-started) for api usage of Google Cloud DNS
- install Docker on your local maquine

## Description
The pipeline it's intented to update the push of our code to a new image on the registry on REPOSITORY_URI (buildspec.yaml)

## Local Build with CodeBuild
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
- Create a [pipeline](https://aws.amazon.com/blogs/devops/build-a-continuous-delivery-pipeline-for-your-container-images-with-amazon-ecr-as-source/)  with a clone of this source
- create config.js file base on example
- create your keyfile.jon download after create a service account
- setup a Task on AWS ECS  pointing to the latest image on the Repositoy indicated in REPOSITORY_URI

## Build locally and run
- create config.js file base on example
```
docker build -t ddns-update/task .
docker run ddns-update/task:latest
```
