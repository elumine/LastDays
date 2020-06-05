import { AnalyticsDevice } from './AnalyticsDevice';
import { AnalyticsEvent } from './AnalyticsEvent';


export class AnalyticsBuild {

  constructor(public id: string, public devices: AnalyticsDevice[], public events: AnalyticsEvent[]) {
    console.info(`AnalyticsBuild()`, id, this);
  }
}
