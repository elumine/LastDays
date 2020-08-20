import { Component, OnInit } from '@angular/core';
import ApexCharts from 'apexcharts'
import { Subscription } from 'rxjs';
import { AnalyticsSession } from 'src/app/services/analytics/AnalyticsSession';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import { ActivatedRoute } from '@angular/router';
import { AnalyticsBuild } from 'src/app/services/analytics/AnalyticsBuild';
import { AnalyticsEvent } from 'src/app/services/analytics/AnalyticsEvent';
import { DateCommon } from 'src/common/DateCommon';


const RENDER_DELAY = 250;

@Component({
  selector: 'app-analytics-session',
  templateUrl: './analytics-session.component.html',
  styleUrls: ['./analytics-session.component.scss']
})
export class AnalyticsSessionComponent implements OnInit {
  private subscription: Subscription;
  chartOptions: any;
  chart: any;

  constructor(
    private analytics: AnalyticsService,
    private activateRoute: ActivatedRoute) {
    this.subscription = activateRoute.params.subscribe(params => {
      this.analytics.currentSessionId = params['sessionId'];
      if (this.analytics.currentBuild) {
        this.analytics.currentSession = this.analytics.currentBuild.findSessionById(this.analytics.currentSessionId);
      }
    });
  }

  get events(): AnalyticsEvent[] {
    if (this.analytics.currentSession) {
      return this.analytics.currentSession.events;
    }
  }

  ngOnInit() {
    console.info(this);
  }
}
