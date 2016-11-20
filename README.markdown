# Going Serverless - AWS Lambda in Practice - Presentation + TODO Demo App [![Build Status](https://travis-ci.org/padurean/going-serverless-spectacle.svg?branch=master)](https://travis-ci.org/padurean/going-serverless-spectacle)

## Reference

This presentation + app was built using React and AWS: Lambda, API Gateway and other friends :)

The presentation itself is based on [Spectacle](https://github.com/FormidableLabs/spectacle).

The source code for the AWS Lambda(s) that constitute it's back-end REST microservice(s)
can be found [here](https://github.com/padurean/going-serverless-spectacle-aws-lambda).

## Live URL

[Going Serverless @ PureCore.ro](http://purecore.ro/going-serverless-spectacle)

## Development

Open terminal and run `npm i`.

Run `rm -R .git` to remove the existing version control.

To start up the local server, run `npm start`.

Open a browser and hit [http://localhost:3000](http://localhost:3000), and you'll be ready to roll.

## Build & Deployment

Building the dist version of the project is as easy as running `npm run build`.

If you want to deploy the slideshow to the `gh-pages` branch, run `npm run deploy`.
