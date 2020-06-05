import moment from 'moment';
import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;
import { AnalyticsEventTypes } from './AnalyticsEventTypes';


export interface AnalyticsEventInterface {
  createdAt: firestore.Timestamp;
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
    this.createdAt = initializer.createdAt.toDate();
    this.createdAtUTC = new Date();
    const timezoneMs = this.createdAt.getTimezoneOffset() * 60000;
    this.createdAtUTC.setTime(this.createdAt.getTime() - timezoneMs);
    this.build = initializer.build;
    this.session = initializer.session;
    this.device = initializer.device;
    this.type = initializer.type;
    this.data = data;
  }

  calculateRoundCreateAt(rounding: AnalyticsEventDateRoundingType): Date {
    const newDate = new Date(this.createdAtUTC);

    switch (rounding) {
      case AnalyticsEventDateRoundingType.Day: newDate.setHours(0, 0, 0, 0); break;
      case AnalyticsEventDateRoundingType.Hour: newDate.setHours(newDate.getHours(), 0, 0, 0); break;
    }
    return newDate;
  }
}

export enum AnalyticsEventDateRoundingType {
  Hour,
  Day
}
