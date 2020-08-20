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

  async ngOnInit() {
    console.info(this);
    this.analytics.load();
  }

  async fetch() {
    await this.analytics.fetch();
  }

  loadTestData() {
    this.analytics.loadTestData();
  }
}
