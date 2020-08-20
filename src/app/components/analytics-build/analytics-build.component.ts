import { Component, OnInit, Input } from '@angular/core';
import ApexCharts from 'apexcharts'
import { AnalyticsBuild } from 'src/app/services/analytics/AnalyticsBuild';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import { AnalyticsSession } from 'src/app/services/analytics/AnalyticsSession';
import { DateCommon } from 'src/common/DateCommon';
import { CalendarEvent, CalendarDaySelectionEvent } from '../calendar/calendar.component';


const RENDER_DELAY = 250;

@Component({
  selector: 'analytics-build',
  templateUrl: './analytics-build.component.html',
  styleUrls: ['./analytics-build.component.scss']
})
export class AnalyticsBuildComponent implements OnInit {
  private subscription: Subscription;
  chartOptions: any;
  chart: any;
  selectedDate: CalendarDaySelectionEvent;

  constructor(
    public analytics: AnalyticsService,
    private router: Router,
    private activateRoute: ActivatedRoute) {
    this.subscription = activateRoute.params.subscribe(params => {
      this.analytics.currentBuildId = params['buildId'];
      this.analytics.currentBuildDate = params['date'];
      this.analytics.currentBuild = this.analytics.statistic.findBuildById(this.analytics.currentBuildId);
      if (this.analytics.currentBuildDate) {
        const parts = this.analytics.currentBuildDate.split('-');
        const year = parseInt(parts[0]);
        const month = parseInt(parts[1]);
        const day = parseInt(parts[2]);
        this.selectedDate = {
          year: year,
          month: month,
          day: day
        }
      }
    });
  }

  get sessions(): AnalyticsSession[] {
    if (this.analytics.currentBuild) {
      return this.analytics.currentBuild.sessions;
    }
  }

  ngOnInit() {
    console.info(this);
  }

  onCalendarEventSelection(event: CalendarEvent) {
    const session = event.initializer as AnalyticsSession;
    this.router.navigate([`admin/statistic/build/${this.analytics.currentBuild.url}/${this.analytics.currentBuildDate}/session/${session.url}`]);
  }

  onCalendarDaySelection(day: CalendarDaySelectionEvent) {
    this.analytics.currentBuildDate = `${day.year}-${day.month}-${day.day}`;
    this.router.navigate([`admin/statistic/build/${this.analytics.currentBuild.url}/${this.analytics.currentBuildDate}`]);
  }
}
