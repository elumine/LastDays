import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { AnalyticsEventInterface, AnalyticsEvent } from './AnalyticsEvent';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { AnalyticsCommon } from './AnalyticsCommon';
import { AnalyticsStatistic } from './AnalyticsStatistic';
import { AnalyticsBuild } from './AnalyticsBuild';
import { AnalyticsSession } from './AnalyticsSession';
import { AnalyticsTestEvents } from './TestData';


@Injectable({ providedIn: 'root' })
export class AnalyticsService {

  collection: AngularFirestoreCollection<AnalyticsEventInterface>;
  events: AnalyticsEvent[] = [];
  statistic: AnalyticsStatistic;
  currentBuildId: string;
  currentBuild: AnalyticsBuild;
  currentBuildDate: string;
  currentSessionId: string;
  currentSession: AnalyticsSession;

  constructor(public readonly store: AngularFirestore) {
    this.collection = this.store.collection<AnalyticsEventInterface>('LastDaysAnalytics');
  }

  async fetch() {
    this.collection.valueChanges()
      .subscribe((events: AnalyticsEventInterface[]) => {
        this.create(events);
        this.save();
      });
  }

  loadTestData() {
    this.create(AnalyticsTestEvents);
    this.save();
  }

  create(events: AnalyticsEventInterface[]) {
    console.groupCollapsed('AnalyticsService.create()', events.length);
    const eventsList = events.map(data => AnalyticsCommon.CreateEvent(data)).filter(v => !!v);
    this.events = AnalyticsCommon.SortSortable(eventsList);
    console.groupEnd();
    console.groupCollapsed('AnalyticsService.Statistic');
    this.statistic = AnalyticsCommon.CreateStatistic(this.events);
    console.groupEnd();
  }

  load() {
    try {
      const string = localStorage.getItem('analytics/data');
      const data = JSON.parse(string);
      const events = data.events as AnalyticsEventInterface[];
      this.create(events);
    } catch (error) {
      console.warn(`AnalyticsService.load() error.`, error);
    }
  }

  save() {
    const events: AnalyticsEventInterface[] = this.events.map(e => e.serialize());
    const data = { events: events };
    const string = JSON.stringify(data);
    localStorage.setItem('analytics/data', string);
  }

  async log(e: AnalyticsEventInterface) {
    await this.collection.add(e);
  }
}
