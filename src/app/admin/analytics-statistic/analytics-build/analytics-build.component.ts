import { Component, OnInit, Input } from '@angular/core';
import { AnalyticsBuild } from 'src/app/services/analytics/AnalyticsBuild';

@Component({
  selector: 'analytics-build',
  templateUrl: './analytics-build.component.html',
  styleUrls: ['./analytics-build.component.scss']
})
export class AnalyticsBuildComponent implements OnInit {

  @Input() build: AnalyticsBuild;

  constructor() { }

  ngOnInit() {
    //
  }
}
