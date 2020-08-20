import { Component, OnInit, Input } from '@angular/core';
import { AnalyticsStatistic } from 'src/app/services/analytics/AnalyticsStatistic';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import { AnalyticsBuild } from 'src/app/services/analytics/AnalyticsBuild';

@Component({
  selector: 'analytics-statistic',
  templateUrl: './analytics-statistic.component.html',
  styleUrls: ['./analytics-statistic.component.scss']
})
export class AnalyticsStatisticComponent implements OnInit {

  constructor(
    public readonly analytics: AnalyticsService) {}

  get statistic() {
    return this.analytics.statistic;
  }

  ngOnInit() {
    //
  }

  isBuildSelected(build: AnalyticsBuild) {
    return build === this.analytics.currentBuild;
  }
}
