import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../services/analytics/analytics.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    public readonly analytics: AnalyticsService) {}

  get statistic() {
    return this.analytics.statistic;
  }

  async ngOnInit() {
    console.info(this);
  }
}
