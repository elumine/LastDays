import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../services/analytics/analytics.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AnalyticsEvent, AnalyticsEventInterface } from '../services/analytics/AnalyticsEvent';
import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;


@Component({
  selector: 'app-analytics-backend',
  templateUrl: './analytics-backend.component.html',
  styleUrls: ['./analytics-backend.component.scss']
})
export class AnalyticsBackendComponent implements OnInit {

  event: AnalyticsEvent;
  status: string = 'None';

  constructor(
    private readonly route: ActivatedRoute,
    public readonly analytics: AnalyticsService) {}

  async ngOnInit() {
    console.info(this);
    this.route.queryParams.subscribe(
      (queryParam: any) => {
        this.log(queryParam['m']);
      });
  }

  log(message: string) {
    console.info('AnalyticsBackendComponent.log()');
    console.log('message:', message);
    if (message) {
      try {
        const payload = JSON.parse(message);
        console.log('payload:', payload);
        const eventInterface: AnalyticsEventInterface = {
          createdAt: Timestamp.fromDate(new Date()),
          build: payload.build || 'None',
          device: payload.device || 'deviceID',
          session: payload.session || 'sessionID',
          type: payload.type,
          data: payload.data
        };
        console.log('eventInterface:', eventInterface);
        this.analytics.log(eventInterface);
        this.status = 'log success';
      } catch (error) {
        this.status = `log error. ${error.toString()}`;
      }
    } else {
      this.status = 'message is undefined';
    }
  }
}
