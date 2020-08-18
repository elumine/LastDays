import { Component, OnInit } from '@angular/core';
import ApexCharts from 'apexcharts'
import { Subscription } from 'rxjs';
import { AnalyticsSession } from 'src/app/services/analytics/AnalyticsSession';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import { ActivatedRoute } from '@angular/router';
import { AnalyticsBuild } from 'src/app/services/analytics/AnalyticsBuild';


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
  renderingInProgress = true;

  constructor(
    private analytics: AnalyticsService,
    private activateRoute: ActivatedRoute) {
    this.subscription = activateRoute.params.subscribe(params => {
      this.analytics.currentSessionId = params['sessionId'];
      if (this.analytics.currentBuild) {
        this.analytics.currentSession = this.analytics.currentBuild.findSessionById(this.analytics.currentSessionId);
        this.updateGraph();
      }
    });
  }

  ngOnInit() {
    console.info(this);
    this.updateGraph();
    setTimeout(() => {
      this.renderingInProgress = false;
      this.renderGraph();
    }, RENDER_DELAY);
  }

  updateGraph() {
    console.info('AnalyticsSessionComponent.updateGraph()', this.analytics.currentSession.id);
    const yeMap = new Map<string, any>();
    this.chartOptions = {
      series: this.analytics.currentSession.events.map((e, eI) => {
        const nextEvent = this.analytics.currentSession.events[eI + 1];
        const eventStartTime = e.createdAtUTC.getTime();
        const eventEndTime = nextEvent ?
          nextEvent.createdAtUTC.getTime() :
          new Date(e.createdAtUTC).setMinutes(e.createdAtUTC.getMinutes() + 5);
        const y = [ eventStartTime, eventEndTime ];
        yeMap.set(`${y[0]}-${y[1]}`, e);
        return {
          name: `${e.type}`,
          data: [{
            x: e.type,
            y: y
          }]
        }
      }),
      chart: {
        type: 'rangeBar'
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(y) {
          const e = yeMap.get(`${y[0]}-${y[1]}`);
          return `${e.type}. ${e.data}`;
        }
      },
      xaxis: {
        type: 'datetime'
      }
    };
    if (this.chart) {
      const chartNode = document.querySelector('#chart2');
      chartNode.innerHTML = '';
      this.renderingInProgress = true;
      setTimeout(() => {
        this.renderingInProgress = false;
        this.renderGraph();
      }, RENDER_DELAY);
    }
  }

  renderGraph() {
    const chartNode = document.querySelector('#chart2');
    if (chartNode) {
      this.chart = new ApexCharts(chartNode, this.chartOptions);
      this.chart.render();
    }
  }
}
