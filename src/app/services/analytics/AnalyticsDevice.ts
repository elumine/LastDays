import { AnalyticsSession } from './AnalyticsSession';
import { AnalyticsEvent } from './AnalyticsEvent';


export class AnalyticsDevice {

  constructor(public id: string, public sessions: AnalyticsSession[], public events: AnalyticsEvent[]) {
    console.info(`AnalyticsDevice()`, id, this);
  }
}
