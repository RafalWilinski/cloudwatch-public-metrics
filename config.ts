const metrics: MetricConfiguration[] = [
  {
    name: 'AWS/Billing//EstimatedCharges',
    title: 'Total AWS Charges',
    duration: '15 days',
    statistic: 'Average',
    dimensions: [{ Name: 'Currency', Value: 'USD' }],
    suffix: '$',
  },
];

export const animationDuration = 2000; // 0 to disable

export default metrics;
