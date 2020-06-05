import { Component, OnInit, Input } from '@angular/core';
import ApexCharts from 'apexcharts'
import { AnalyticsStatistic } from 'src/app/services/analytics/AnalyticsStatistic';
import { AnalyticsCommon } from 'src/app/services/analytics/AnalyticsCommon';
import { AnalyticsEventDateRoundingType } from 'src/app/services/analytics/AnalyticsEvent';

@Component({
  selector: 'analytics-statistic',
  templateUrl: './analytics-statistic.component.html',
  styleUrls: ['./analytics-statistic.component.scss']
})
export class AnalyticsStatisticComponent implements OnInit {

  @Input() statistic: AnalyticsStatistic;

  constructor() { }

  ngOnInit() {
    this.createChart();
  }

  createChart() {
    const eventTypePairs = {};
    const eventTypeList = [];
    this.statistic.events.forEach(event => {
      if (!eventTypePairs[event.type]) { eventTypePairs[event.type] = []; }
      eventTypePairs[event.type].push(event);
    });
    for (const type in eventTypePairs) {
      const eventsByDate = Array.from(
          AnalyticsCommon.SplitEventsByDate(eventTypePairs[type], AnalyticsEventDateRoundingType.Hour)
            .entries()
        )
        .map(v => ({
          time: v[1].date.getTime(),
          date: v[1].date,
          events: v[1].events,
          count: v[1].events.length
        }))
      eventTypeList.push({
        type: type,
        eventsByDate: eventsByDate
      });
    }
    console.log(eventTypeList);
    const options = {
      chart: {
        type: 'bar',
        // curve: 'smooth',
        stacked: true
      },
      xaxis: {
        type: 'datetime'
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: `${100/24}%`,
        }
      },
      series: eventTypeList.map(typeData => ({
        name: typeData.type,
        data: typeData.eventsByDate.map(eventByDay => ({
          x: eventByDay.time,
          y: eventByDay.count
        }))
      }))
    }
    const chart = new ApexCharts(document.querySelector('#chart1'), options)
    chart.render();
  }
}
