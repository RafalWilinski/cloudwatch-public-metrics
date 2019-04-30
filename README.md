# ![Logo](assets/logo.png "cloudwatch-public-metrics")

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)

Expose AWS Cloudwatch Metrics as a public HTML page using AWS Lambda and server-side rendering, for free. Inspired by [Yan Cui's](https://github.com/theburningmonk) [concept](https://pbs.twimg.com/media/DXmrxJQXcAAGxGB.jpg:large) & [status.github.com](status.github.com)

![Demo](assets/demo.png "demo")

## Demo

[Todo - my AWS account estimated charges](https://yvuuhi6gyg.execute-api.us-east-1.amazonaws.com/dev/)

## Usage

Clone the repo, install dependencies and deploy function:

```
$ git clone https://github.com/RafalWilinski/cloudwatch-public-metrics
$ npm install
$ npm run deploy
```

## Config
Simply edit `config.ts` file by changing/adding array entries following `MetricConfiguration` interface:

```java
interface MetricConfiguration {
  name: String;
  title: String;
  duration: String;
  statistic: String;
  dimensions: NameValuePair[];
  suffix: String;
}
```

## License
MIT © [Rafal Wilinski](http://rwilinski.me)

### Credits
Logo by [Dinosoft Labs](https://thenounproject.com/dinosoftlabs/)
