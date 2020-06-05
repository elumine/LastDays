import { Component, OnInit, Input } from '@angular/core';
import { AnalyticsSession } from '../../../../../../app/services/analytics/AnalyticsSession';

@Component({
  selector: 'analytics-session',
  templateUrl: './analytics-session.component.html',
  styleUrls: ['./analytics-session.component.scss']
})
export class AnalyticsSessionComponent implements OnInit {

  @Input() session: AnalyticsSession;

  constructor() { }

  ngOnInit() {
    //
  }
}
