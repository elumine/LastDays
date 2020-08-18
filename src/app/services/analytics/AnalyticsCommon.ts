import { AnalyticsEventInterface, AnalyticsEventConstructor, AnalyticsEvent, AnalyticsEventDateRoundingType } from './AnalyticsEvent';
import { AnalyticsEventTypes } from './AnalyticsEventTypes';
import { AnalyticsStatistic } from './AnalyticsStatistic';
import { AnalyticsBuild } from './AnalyticsBuild';
import { AnalyticsDevice } from './AnalyticsDevice';
import { AnalyticsSession } from './AnalyticsSession';


export class AnalyticsCommon {

  static TypeToEventMap = new Map<AnalyticsEventTypes, AnalyticsEventConstructor>();

  static CreateStatistic(events: AnalyticsEvent[]) {
    const buildsPair = {};
    console.group('AnalyticsCommon.CreateStatistic()');
    console.log('events:', events);
    events.forEach(event => {
      const id = event.build;
      if (!buildsPair[id]) { buildsPair[id] = []; }
      buildsPair[id].push(event);
    });
    console.log('buildsPair:', buildsPair);
    const builds: AnalyticsBuild[] = [];
    for (const id in buildsPair) {
      builds.push(AnalyticsCommon.CreateBuild(id, buildsPair[id]));
    }
    console.log('builds:', builds);
    const instance = new AnalyticsStatistic(builds, events);
    console.groupEnd();
    return instance;
  }

  static CreateBuild(buildId: string, events: AnalyticsEvent[]) {
    const devicesPair = {};
    console.group('AnalyticsCommon.CreateBuild()', buildId);
    console.log('events:', events);
    events.forEach(event => {
      const id = event.device;
      if (!devicesPair[id]) { devicesPair[id] = []; }
      devicesPair[id].push(event);
    });
    console.log('devicesPair:', devicesPair);
    const devices: AnalyticsDevice[] = [];
    for (const id in devicesPair) {
      devices.push(AnalyticsCommon.CreateDevice(id, devicesPair[id]));
    }
    console.log('devices:', devices);
    const instance = new AnalyticsBuild(buildId, devices, events);
    console.groupEnd();
    return instance;
  }

  static CreateDevice(deviceId: string, events: AnalyticsEvent[]) {
    const sessionsPair = {};
    console.group('AnalyticsCommon.CreateDevice()', deviceId);
    console.log('events:', events);
    events.forEach(event => {
      const id = event.session;
      if (!sessionsPair[id]) { sessionsPair[id] = []; }
      sessionsPair[id].push(event);
    });
    console.log('sessionsPair:', sessionsPair);
    const sessions: AnalyticsSession[] = [];
    for (const id in sessionsPair) {
      sessions.push(AnalyticsCommon.CreateSession(id, sessionsPair[id]));
    }
    console.log('sessions:', sessions);
    const instance = new AnalyticsDevice(deviceId, sessions, events);
    console.groupEnd();
    return instance;
  }

  static CreateSession(sessionId: string, events: AnalyticsEvent[]) {
    console.group('AnalyticsCommon.CreateSession()', sessionId);
    console.log('events:', events);
    const instance = new AnalyticsSession(sessionId, events);;
    console.groupEnd();
    return instance;
  }

  static CreateEvent(initializer: AnalyticsEventInterface) {
    console.group('AnalyticsCommon.CreateEvent()');
    console.log('initializer:', initializer);
    try {
      let data: any = initializer.data;
      try {
        data = JSON.parse(initializer.data) as any;
      } catch (error) {
        // console.warn(`data parsing error`, error);
      }
      console.log('data:', data);
      const fn = AnalyticsCommon.TypeToEventMap.get(initializer.type);
      if (fn) {
        const instance = new fn(initializer, data) as AnalyticsEvent;
        console.groupEnd();
        return instance;
      } else {
        const instance = new AnalyticsEvent(initializer, data);
        console.groupEnd();
        return instance;
      }
    } catch (error) {
      console.warn(`AnalyticsCommon.CreateEvent() error`, error);
      console.groupEnd();
      return null;
    }
  }

  static SplitEventsByDate(events: AnalyticsSortable[], rounding: AnalyticsEventDateRoundingType) {
    const sorted = this.SortEventsByDate(events);
    const datesToEventsPairs = new Map<string, { date: Date; events: AnalyticsSortable[] }>();
    sorted.forEach(event => {
      const roundDate = this.RoundDate(event.getSortDate(), rounding);
      const timestamp = roundDate.toDateString();
      if (!datesToEventsPairs.has(timestamp)) {
        datesToEventsPairs.set(timestamp, {
          date: roundDate,
          events: []
        });
      }
      datesToEventsPairs.get(timestamp).events.push(event);
    })
    return datesToEventsPairs;
  }

  static RoundDate(date: Date, rounding: AnalyticsEventDateRoundingType): Date {
    const newDate = new Date(date);
    switch (rounding) {
      case AnalyticsEventDateRoundingType.Day: newDate.setHours(0, 0, 0, 0); break;
      case AnalyticsEventDateRoundingType.Hour: newDate.setHours(newDate.getHours(), 0, 0, 0); break;
    }
    return newDate;
  }

  static SortEventsByDate(events: AnalyticsSortable[]): AnalyticsSortable[] {
    return events.sort((a, b) => a.getSortDate().getTime() - b.getSortDate().getTime());
  }
}

export interface AnalyticsSortable {
  getSortDate(): Date;
}

