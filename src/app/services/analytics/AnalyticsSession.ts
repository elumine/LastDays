import { AnalyticsEvent } from './AnalyticsEvent';
import { AnalyticsCommon, AnalyticsSortable } from './AnalyticsCommon';
import { DateCommon } from 'src/common/DateCommon';
import { TimelineEventInterface } from 'src/app/components/timeline/timeline.component';
import { CalendarEventInterface } from 'src/app/components/calendar/calendar.component';


const DURATION = 1000 * 60;
export class AnalyticsSession implements AnalyticsSortable, CalendarEventInterface {

  startTime: Date = null;
  endTime: Date = null;

  constructor(public id: string, public events: AnalyticsEvent[]) {
    console.info(`AnalyticsSession()`, this);
    if (this.hasEvents) {
      this.startTime = new Date(this.firstEvent.startTime);
      if (this.eventsCount > 1) {
        this.endTime = new Date(Math.max(this.lastEvent.endTime.getTime(), this.startTime.getTime() + DURATION));
      } else {
        this.endTime = new Date(this.startTime.getTime() + DURATION);
      }
    }
  }

  get url() { return this.id; }
  get eventsCount() { return this.events.length; }
  get hasEvents() { return this.eventsCount > 0; }
  get firstEvent() { return this.events[0]; }
  get lastEvent() { return this.events[this.events.length - 1]; }

  get timeRangeText(): string {
    return `${DateCommon.TimeDisplayText(this.startTime)} - ${DateCommon.TimeDisplayText(this.endTime)}`;
  }

  get duration() {
    return this.endTime.getTime() - this.startTime.getTime();
  }

  getSortDate() { return this.startTime; }
  getCalendarStartTime() { return this.startTime; }
  getCalendarEndTime() { return this.endTime; }
  getCalendarLabelText() {
    return `${(this.duration / (1000 * 60)).toFixed(1)} m`;
  }
  getCalendarSideText() {
    return `${this.timeRangeText}`;
  }
}
