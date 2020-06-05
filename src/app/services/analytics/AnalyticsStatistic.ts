import { AnalyticsBuild } from './AnalyticsBuild';
import { AnalyticsEvent } from './AnalyticsEvent';


export class AnalyticsStatistic {

  constructor(public builds: AnalyticsBuild[], public events: AnalyticsEvent[]) {
    console.info(`AnalyticsStatistic()`, this);
  }
}
