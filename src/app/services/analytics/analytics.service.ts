import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { AnalyticsEventInterface, AnalyticsEvent } from './AnalyticsEvent';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { AnalyticsCommon } from './AnalyticsCommon';
import { AnalyticsStatistic } from './AnalyticsStatistic';
import { AnalyticsBuild } from './AnalyticsBuild';
import { AnalyticsSession } from './AnalyticsSession';


@Injectable({ providedIn: 'root' })
export class AnalyticsService {

  collection: AngularFirestoreCollection<AnalyticsEventInterface>;
  events: AnalyticsEvent[] = [];
  statistic: AnalyticsStatistic;
  currentBuildId: string;
  currentBuild: AnalyticsBuild;
  currentSessionId: string;
  currentSession: AnalyticsSession;


  constructor(public readonly store: AngularFirestore) {
    console.group('AnalyticsService()');
    this.collection = this.store.collection<AnalyticsEventInterface>('LastDaysAnalytics');
    this.collection.valueChanges()
      .subscribe((eventsData: AnalyticsEventInterface[]) => {
        console.group('AnalyticsService.Events');
        this.events = eventsData.map(data => AnalyticsCommon.CreateEvent(data)).filter(v => !!v);
        console.groupEnd();
        console.group('AnalyticsService.Statistic');
        this.statistic = AnalyticsCommon.CreateStatistic(this.events);
        console.groupEnd();
        console.groupEnd();
      });
  }

  async log(e: AnalyticsEventInterface) {
    await this.collection.add(e);
  }
}
