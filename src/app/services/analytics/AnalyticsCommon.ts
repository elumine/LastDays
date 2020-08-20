import { AnalyticsEventInterface, AnalyticsEvent, AnalyticsEventDateRoundingType } from './AnalyticsEvent';
import { AnalyticsStatistic } from './AnalyticsStatistic';
import { AnalyticsBuild } from './AnalyticsBuild';
import { AnalyticsDevice } from './AnalyticsDevice';
import { AnalyticsSession } from './AnalyticsSession';


export class AnalyticsCommon {

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
    let builds: AnalyticsBuild[] = [];
    for (const id in buildsPair) {
      builds.push(AnalyticsCommon.CreateBuild(id, buildsPair[id]));
    }
    builds = AnalyticsCommon.SortSortable(builds);
    console.log('builds:', builds);
    const instance = new AnalyticsStatistic(builds, events);
    console.groupEnd();
    return instance;
  }

  static CreateBuild(buildId: string, events: AnalyticsEvent[]) {
    const sessionsPair = {};
    console.group('AnalyticsCommon.CreateBuild()', buildId);
    console.log('events:', events);
    events.forEach(event => {
      const id = event.session;
      if (!sessionsPair[id]) { sessionsPair[id] = []; }
      sessionsPair[id].push(event);
    });
    console.log('sessionsPair:', sessionsPair);
    let sessions: AnalyticsSession[] = [];
    for (const id in sessionsPair) {
      sessions.push(AnalyticsCommon.CreateSession(id, sessionsPair[id]));
    }
    sessions = AnalyticsCommon.SortSortable(sessions);
    console.log('sessions:', sessions);
    const instance = new AnalyticsBuild(buildId, sessions, events);
    console.groupEnd();
    return instance;
  }

  static CreateSession(sessionId: string, events: AnalyticsEvent[]) {
    console.group('AnalyticsCommon.CreateSession()', sessionId);
    events = AnalyticsCommon.SortSortable(events);
    events.forEach((e, eI) => {
      const next = events[eI + 1];
      if (next) {
        e.setNextEvent(next);
      }
    });
    console.log('events:', events);
    const instance = new AnalyticsSession(sessionId, events);;
    console.groupEnd();
    return instance;
  }

  static CreateEvent(initializer: AnalyticsEventInterface) {
    return new AnalyticsEvent(initializer);
  }

  static SplitObjectsByDate(events: AnalyticsSortable[], rounding: AnalyticsEventDateRoundingType) {
    const sorted = this.SortSortable(events);
    const datesToEventsPairs = new Map<string, { date: Date; events: AnalyticsSortable[] }>();
    sorted.forEach(event => {
      const roundDate = this.RoundSortableDate(event.getSortDate(), rounding);
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

  static RoundSortableDate(date: Date, rounding: AnalyticsEventDateRoundingType): Date {
    const newDate = new Date(date);
    switch (rounding) {
      case AnalyticsEventDateRoundingType.Day: newDate.setHours(0, 0, 0, 0); break;
      case AnalyticsEventDateRoundingType.Hour: newDate.setHours(newDate.getHours(), 0, 0, 0); break;
    }
    return newDate;
  }

  static SortSortable<T extends AnalyticsSortable>(events: AnalyticsSortable[]): T[] {
    return events.sort((a, b) => a.getSortDate().getTime() - b.getSortDate().getTime()) as any;
  }
}

export interface AnalyticsSortable {
  getSortDate(): Date;
}

