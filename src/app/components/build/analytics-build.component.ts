import { Component, OnInit, Input } from '@angular/core';
import ApexCharts from 'apexcharts'
import { AnalyticsBuild } from 'src/app/services/analytics/AnalyticsBuild';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';


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
  renderingInProgress = true;

  constructor(
    public analytics: AnalyticsService,
    private router: Router,
    private activateRoute: ActivatedRoute) {
    this.subscription = activateRoute.params.subscribe(params => {
      this.analytics.currentBuildId = params['buildId'];
      this.analytics.currentBuild = this.analytics.statistic.findBuildById(this.analytics.currentBuildId);
      this.updateGraph();
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
    console.info('AnalyticsBuildComponent.updateGraph()', this.analytics.currentBuild.id);
    const ysMap = new Map<string, any>();
    this.chartOptions = {
      series: this.analytics.currentBuild.sessions.map(s => {
        const y = [
          s.startTime.getTime(),
          new Date(s.endTime.getTime() + 1000 * 60 * 60).getTime()
        ];
        ysMap.set(`${y[0]}-${y[1]}`, s);
        return {
          name: s.id,
          data: [{
            x: 'Sessions',
            y: y
          }]
        }
      }),
      chart: {
        type: 'rangeBar',
        events: {
          click: (event, chartContext, config) => {
            const { seriesIndex: sessionIndex } = config;
            const session = this.analytics.currentBuild.sessions[sessionIndex];
            if (session) {
              this.router.navigate([`admin/statistic/build/${this.analytics.currentBuildId}/session/${session.url}`]);
            }
          }
        }
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(y) {
          const s = ysMap.get(`${y[0]}-${y[1]}`);
          return s.events.length;
        }
      },
      xaxis: {
        type: 'datetime'
      }
    };
    if (this.chart) {
      const chartNode = document.querySelector('#chart1');
      chartNode.innerHTML = '';
      this.renderingInProgress = true;
      setTimeout(() => {
        this.renderingInProgress = false;
        this.renderGraph();
      }, RENDER_DELAY);
    }
  }

  renderGraph() {
    const chartNode = document.querySelector('#chart1');
    if (chartNode) {
      this.chart = new ApexCharts(chartNode, this.chartOptions);
      this.chart.render();
    }
  }
}
