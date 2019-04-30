interface NameValuePair {
  Name: String;
  Value: String;
}

interface MetricConfiguration {
  name: String;
  title: String;
  duration: String;
  statistic: String;
  dimensions: NameValuePair[];
  suffix: String;
}

interface MetricData extends MetricConfiguration {
  datapoints: AWS.CloudWatch.Datapoint[];
}
