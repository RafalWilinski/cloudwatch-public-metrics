![Logo]('./assets/logo.png' "cloudwatch-public-metrics")

Expose AWS Cloudwatch Metrics to public using AWS Lambda and server-side rendering for free. Inspired by [Yan Cui's](https://github.com/theburningmonk) [concept](https://pbs.twimg.com/media/DXmrxJQXcAAGxGB.jpg:large) & [status.github.com](status.github.com)

![Demo]('./assets/demo.png' "demo")
## Demo

Todo - my AWS account charges

## Usage
First, ensure that you have [Serverless Framework](serverless.com) installed. If not, install it:

```sh
$ npm install serverless -g
```

Clone the repo, install dependencies and deploy function:

```
$ git clone https://github.com/RafalWilinski/cloudwatch-public-metrics
$ npm install
$ serverless deploy
```

## Config
For now, cloudwatch-public-metrics supports only one way to define config.

1. `config.yml` file:
```
METRIC_NAME: <Use "Namespace//MetricName" format e.g.: AWS/Billing//EstimatedCharges>  *required*
METRIC_TITLE: <Add custom title like: "Total AWS Charges">
METRIC_DURATION: <EndDate - StartDate e.g: "7 days"> *required*
METRIC_STATISTIC: <One of: ["Average", "Sum", "SampleCount", "Minimum", "Maximum"]> *required*
METRIC_DIMENSIONS: 
  - Name: Currency *required*
    Value: USD *required*
METRIC_SUFFIX: <For instance "%", "ms" or "$">

```

Support using flags is a WIP.
## Development 

```sh
AWS_REGION=us-east-1 npm run watch
```

## License
MIT © [Rafal Wilinski](http://rwilinski.me)
