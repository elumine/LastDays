import { AnalyticsEvent } from './AnalyticsEvent';
import { AnalyticsCommon } from './AnalyticsCommon';


export class AnalyticsSession {

  startTime: Date;
  endTime: Date;

  constructor(public id: string, public events: AnalyticsEvent[]) {
    console.info(`AnalyticsSession()`, id, this);
    this.startTime = new Date(this.events[0].createdAtUTC);
    this.endTime = new Date(this.events[this.events.length - 1].createdAtUTC);
  }

  get url() { return this.id; }
}
