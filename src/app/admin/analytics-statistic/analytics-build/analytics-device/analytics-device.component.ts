import { Component, OnInit, Input } from '@angular/core';
import { AnalyticsDevice } from 'src/app/services/analytics/AnalyticsDevice';

@Component({
  selector: 'analytics-device',
  templateUrl: './analytics-device.component.html',
  styleUrls: ['./analytics-device.component.scss']
})
export class AnalyticsDeviceComponent implements OnInit {

  @Input() device: AnalyticsDevice;

  constructor() { }

  ngOnInit() {
    //
  }
}
