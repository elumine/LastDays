import { AnalyticsEvent } from './AnalyticsEvent';


export class AnalyticsSession {

  constructor(public id: string, public events: AnalyticsEvent[]) {
    console.info(`AnalyticsSession()`, id, this);
  }
}
