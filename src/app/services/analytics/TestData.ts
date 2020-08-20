import { AnalyticsEventInterface } from './AnalyticsEvent';

export const AnalyticsTestEvents: AnalyticsEventInterface[] = [];

for (let b = 0; b < 2; b++) {
  for (let d = 0; d < 2; d++) {
    for (let s = 0; s < 50; s++) {
      for (let e = 0; e < 20; e++) {
        const date = new Date();
        date.setTime(
          date.getTime() +
            (parseInt((Math.random() * 2).toFixed(0)) * 1000 * 60 * 60 +
            parseInt((Math.random() * 59).toFixed(0)) * 1000 * 60 +
            parseInt((Math.random() * 59).toFixed(0)) * 1000) * (s + 1)/50
        );
        AnalyticsTestEvents.push({
          build: `TestBuild${b} | 0.0.0.0 | Test`,
          device: `testId${d} | TestDevice`,
          session: `test${s}`,
          type: `event${e}`,
          data: `data${e}`,
          createdAt: date.toISOString()
        })
      }
    }
  }
}
