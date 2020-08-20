
import { AnalyticsDevice } from './AnalyticsDevice';
import { AnalyticsEvent } from './AnalyticsEvent';
import { AnalyticsSession } from './AnalyticsSession';
import { AnalyticsSortable } from './AnalyticsCommon';
import { DateCommon } from 'src/common/DateCommon';


export class AnalyticsBuild implements AnalyticsSortable {
  startTime: Date = null;
  endTime: Date = null;
  versionName: string;
  versionNumber: string;
  buildType: string;

  constructor(public id: string, public sessions: AnalyticsSession[], public events: AnalyticsEvent[]) {
    console.info(`AnalyticsBuild()`, this);
    const ids = id.split(' | ');
    this.versionName = ids[0];
    this.versionNumber = ids[1];
    this.buildType = ids[2];
    if (this.hasSessions) {
      this.startTime = new Date(this.firstSession.startTime);
      if (this.sessionsCount > 1) {
        this.endTime = new Date(this.lastSession.startTime);
      } else {
        this.endTime = new Date(this.startTime.getTime() + 1000 * 60);
      }
    }
  }

  get url() { return this.id; }
  get sessionsCount() { return this.sessions.length; }
  get hasSessions() { return this.sessionsCount > 0; }
  get firstSession() { return this.sessions[0]; }
  get lastSession() { return this.sessions[this.sessions.length - 1]; }

  get timeRangeText(): string {
    return `${DateCommon.DateDisplayText(this.startTime)} - ${DateCommon.DateDisplayText(this.endTime)}`;
  }

  findSessionById(id: string) {
    return this.sessions.find(s => s.id === id);
  }

  getSortDate() { return this.startTime; }
}
