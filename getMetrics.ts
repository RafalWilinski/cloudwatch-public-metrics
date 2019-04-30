import { DateTime } from "luxon";
import AWS from "aws-sdk";

const cloudwatch = new AWS.CloudWatch();

export default (metrics: MetricConfiguration[]): Promise<MetricData[]> =>
  Promise.all(
    metrics.map(async metric => {
      const MetricName = metric.name.split("//")[1];
      const Namespace = metric.name.split("//")[0];
      const DurationKey = metric.duration.split(" ")[1];
      const DurationValue = metric.duration.split(" ")[0];
      const StartTime = DateTime.local()
        .minus({ [DurationKey]: DurationValue })
        .toUTC()
        .toISO();
      const EndTime = DateTime.local()
        .toUTC()
        .toISO();

      const params = {
        MetricName,
        Namespace,
        EndTime,
        Period: 1800,
        StartTime,
        Dimensions: metric.dimensions,
        Statistics: [metric.statistic]
      };

      const { Datapoints } = await cloudwatch
        .getMetricStatistics(params)
        .promise();

      return {
        datapoints: Datapoints,
        ...metric
      };
    })
  );
