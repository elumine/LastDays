import { Component, OnInit, Input } from '@angular/core';
import { AnalyticsEvent } from '../../../../../../../app/services/analytics/AnalyticsEvent';

@Component({
  selector: 'analytics-event',
  templateUrl: './analytics-event.component.html',
  styleUrls: ['./analytics-event.component.scss']
})
export class AnalyticsEventComponent implements OnInit {

  @Input() event: AnalyticsEvent;

  constructor() { }

  ngOnInit() {
    //
  }
}
