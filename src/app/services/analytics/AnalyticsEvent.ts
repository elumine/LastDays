import { AnalyticsSortable } from './AnalyticsCommon';
import { DateCommon } from 'src/common/DateCommon';
import { TimelineEventInterface } from 'src/app/components/timeline/timeline.component';

export interface AnalyticsEventInterface {
  createdAt: string;
  build: string;
  session: string;
  device: string;
  type: string;
  data: string;
}

const DURATION = 1000;

export class AnalyticsEvent implements AnalyticsSortable, TimelineEventInterface {
  startTime: Date = null;
  endTime: Date = null;
  build: string = null;
  session: string = null;
  device: string = null;
  type: string = null;
  data: string = null;
  nextEvent: AnalyticsEvent = null;

  constructor(initializer: AnalyticsEventInterface) {
    console.info(`AnalyticsEvent()`, initializer, this);
    this.startTime = new Date(initializer.createdAt);
    this.endTime = new Date(this.startTime.getTime() + DURATION);
    this.build = initializer.build;
    this.session = initializer.session;
    this.device = initializer.device;
    this.type = initializer.type;
    this.data = initializer.data;
  }

  get timeRangeText(): string {
    return `${DateCommon.TimeDisplayText(this.startTime)} - ${DateCommon.TimeDisplayText(this.endTime)}`;
  }

  get duration() {
    return this.endTime.getTime() - this.startTime.getTime();
  }

  serialize(): AnalyticsEventInterface {
    return {
      build: this.build,
      data: this.data,
      session: this.session,
      device: this.device,
      type: this.type,
      createdAt: this.startTime.toISOString()
    };
  }

  getSortDate() { return this.startTime; }

  getTimelineStartTime(): Date {
    return this.startTime;
  }
  getTimelineEndTime(): Date {
    return this.endTime;
  }
  getTimelineLabelText(): string {
    return `${this.type} ${this.data}`;
  }
  getTimelineHoverText(): string {
    return `${this.type} ${this.data}`;
  }

  setNextEvent(e: AnalyticsEvent) {
    this.nextEvent = e;
    this.endTime = new Date(Math.max(this.nextEvent.startTime.getTime(), this.startTime.getTime() + DURATION));
  }
}

export enum AnalyticsEventDateRoundingType {
  Hour,
  Day
}
