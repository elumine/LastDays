
import { AnalyticsDevice } from './AnalyticsDevice';
import { AnalyticsEvent } from './AnalyticsEvent';
import { AnalyticsSession } from './AnalyticsSession';


export class AnalyticsBuild {
  uuid: string = (Math.random() * 1000000000000).toFixed(0);
  versionName: string;
  versionNumber: string;
  buildType: string;
  sessions: AnalyticsSession[] = [];

  constructor(public id: string, public devices: AnalyticsDevice[], public events: AnalyticsEvent[]) {
    console.info(`AnalyticsBuild()`, id, this);
    const ids = id.split(' | ');
    this.versionName = ids[0];
    this.versionNumber = ids[1];
    this.buildType = ids[2];
    this.devices.forEach(d => {
      d.sessions.forEach(s => {
        this.sessions.push(s);
      });
    });
  }

  get url() { return this.id; }

  findSessionById(id: string) {
    return this.sessions.find(s => s.id === id);
  }
}
