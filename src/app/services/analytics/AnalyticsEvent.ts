import { AnalyticsEventTypes } from './AnalyticsEventTypes';

type Timestamp = {
  seconds: number;
}
export interface AnalyticsEventInterface {
  createdAt: Timestamp | string;
  build: string;
  session: string;
  device: string;
  type: AnalyticsEventTypes;
  data: string;
}

export type AnalyticsEventConstructor<DataType = any> = new (initializer: AnalyticsEventInterface, data: DataType) => AnalyticsEvent;

export class AnalyticsEvent<DataType = any> {
  createdAt: Date;
  createdAtUTC: Date;
  build: string;
  session: string;
  device: string;
  type: AnalyticsEventTypes;
  data: DataType;

  constructor(initializer: AnalyticsEventInterface, data: DataType) {
    console.info(`AnalyticsEvent()`, initializer, this);
    this.createdAt = new Date((initializer.createdAt as Timestamp).seconds * 1000);
    this.createdAtUTC = new Date();
    const timezoneMs = this.createdAt.getTimezoneOffset() * 60000;
    this.createdAtUTC.setTime(this.createdAt.getTime() - timezoneMs);
    this.build = initializer.build;
    this.session = initializer.session;
    this.device = initializer.device;
    this.type = initializer.type;
    this.data = data;
  }
}

export enum AnalyticsEventDateRoundingType {
  Hour,
  Day
}
