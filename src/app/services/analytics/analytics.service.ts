import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { AnalyticsEventInterface, AnalyticsEvent } from './AnalyticsEvent';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { AnalyticsCommon } from './AnalyticsCommon';
import { AnalyticsStatistic } from './AnalyticsStatistic';


@Injectable({ providedIn: 'root' })
export class AnalyticsService {

  collection: AngularFirestoreCollection<AnalyticsEventInterface>;
  events: AnalyticsEvent[] = [];
  statistic: AnalyticsStatistic;

  constructor(public readonly store: AngularFirestore) {
    this.collection = this.store.collection<AnalyticsEventInterface>('LastDaysAnalytics');
    this.collection.valueChanges()
      .subscribe((eventsData: AnalyticsEventInterface[]) => {
        this.events = eventsData.map(data => AnalyticsCommon.CreateEvent(data)).filter(v => !!v);
        this.statistic = AnalyticsCommon.CreateStatistic(this.events);
      });
  }

  async log(e: AnalyticsEventInterface) {
    await this.collection.add(e);
  }
}
