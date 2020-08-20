import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DateCommon } from 'src/common/DateCommon';

@Component({
  selector: 'timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit, OnChanges {
  @Input() events: TimelineEventInterface[] = [];
  @Input() rowsCount: number = 3;
  @Input() timePerPixel: number = 1000;
  timeline: Timeline;

  constructor() {}

  ngOnInit() {
    console.info(`TimelineComponent()`, this);
    this.createTimeline();
  }

  ngOnChanges() {
    this.createTimeline();
  }

  createTimeline() {
    this.timeline = new Timeline(this.events, this.timePerPixel, this.rowsCount);
  }

  onSliderRowsCountChange(e) {
    this.rowsCount = parseInt(e.target.value);
    this.render();
  }

  onSliderTPPChange(e) {
    this.timePerPixel = parseInt(e.target.value);
    this.render();
  }

  render() {
    console.log('render()', this.rowsCount);
    this.timeline.render(this.timePerPixel, this.rowsCount);
  }
}


export interface TimelineEventInterface {
  getTimelineStartTime(): Date;
  getTimelineEndTime(): Date;
  getTimelineLabelText(): string;
  getTimelineHoverText(): string;
}

class Timeline {
  public events: TimelineEvent[] = [];
  public rows: TimelineRow[] = [];
  mesh = {
    size: {
      x: '0px'
    }
  }

  constructor(events: TimelineEventInterface[], public timePerPixel: number, public rowsCount: number) {
    this.events = events.map(v => new TimelineEvent(v));
    this.events.forEach((e, eI) => {
      e.setEventIndex(eI);
    });
    this.updateTransform(this.timePerPixel, this.rowsCount);
  }

  render(timePerPixel: number, rowsCount: number) {
    this.timePerPixel = timePerPixel;
    this.rowsCount = rowsCount;
    this.updateTransform(this.timePerPixel, this.rowsCount);
  }

  get hasEvents() { return this.events.length > 0; }
  get eventsCount() { return this.events.length; }
  get firstEvent() { return this.events[0]; }
  get lastEvent() { return this.events[this.events.length - 1]; }
  get startTime(): Date {
    return this.firstEvent.startTime;
  }
  get endTime(): Date {
    return new Date((this.lastEvent.endTime.getTime() + this.lastEvent.duration));
  }
  get duration() {
    return this.endTime.getTime() - this.startTime.getTime();
  }

  updateTransform(timePerPixel: number, rowsCount: number) {
    const pixelWidth = this.duration / timePerPixel;
    this.mesh.size.x = `${pixelWidth + 150}px`;
    this.events.forEach((e, eI) => {
      e.updateTransform(this.startTime, timePerPixel, rowsCount);
    });
    this.rows = new Array(this.rowsCount).fill(1).map((v, vI) => new TimelineRow(vI));
    this.rows.push(new TimelineRow(this.rows.length, true));
  }
}

class TimelineRow {
  mesh = {
    position: {
      y: '0px'
    }
  }

  constructor(public index: number, public isExtra = false) {
    this.mesh.position.y = `${index * 150}px`;
  }
}

const TIMELINE_EVENT_WIDTH_MIN = 1;
class TimelineEvent {
  index: number = 0;
  startTime: Date;
  endTime: Date;
  labelText: string;
  sideText: string;
  hoverText: string;
  startTimeLabelTextDate: string;
  endTimeLabelTextDate: string;
  startTimeLabelTextTime: string;
  endTimeLabelTextTime: string;
  mesh = {
    position: {
      x1: '0',
      x2: '0',
      y: '0'
    },
    size: {
      x: '0',
      y: '0'
    },
    color: 'rgba(0, 0, 0, 1)'
  }

  constructor(public initializer: TimelineEventInterface) {
    this.startTime = initializer.getTimelineStartTime();
    this.endTime = initializer.getTimelineEndTime();
    this.labelText = `${(this.duration / 1000).toFixed(1)}s`;
    this.sideText = `${initializer.getTimelineLabelText()}`;
    this.hoverText = initializer.getTimelineHoverText();
    this.startTimeLabelTextDate = DateCommon.DateDisplayTextYYMMDD(this.startTime);
    this.startTimeLabelTextTime = DateCommon.TimeDisplayText(this.startTime);
    this.endTimeLabelTextDate = DateCommon.DateDisplayTextYYMMDD(this.endTime);
    this.endTimeLabelTextTime = DateCommon.TimeDisplayText(this.endTime);
  }

  get duration() {
    return this.endTime.getTime() - this.startTime.getTime();
  }

  setEventIndex(v: number) {
    this.index = v;
  }

  updateTransform(startTime: Date, timePerPixel: number, rowsCount: number) {
    const eventStartTime = this.startTime.getTime();
    const eventEndTime = this.endTime.getTime();
    const timelineStartTime = startTime.getTime();
    const eventDuration = this.duration;
    const eventWidth = Math.max(eventDuration / timePerPixel, TIMELINE_EVENT_WIDTH_MIN);
    const eventStartLocationX = (eventStartTime - timelineStartTime) / timePerPixel;
    const eventEndLocationX = (eventEndTime - timelineStartTime) / timePerPixel;
    this.mesh.position.x1 = `${eventStartLocationX + 75}px`;
    this.mesh.position.x2 = `${eventEndLocationX + 75}px`;
    this.mesh.size.x = `${eventWidth}px`;
    // const eventHeight = 1 / rowsCount;
    const eventRow = this.index % rowsCount;
    const eventStartLocationY = eventRow * 150;
    this.mesh.position.y = `${eventStartLocationY}px`;
    // this.mesh.size.y = `${eventHeight * 100}%`;
    this.mesh.color = TimelineCommon.GetColorByRow(eventRow);
  }
}

export class TimelineCommon {
  static GetColorByRow(row: number) {
    switch(row) {
      // case 0: return `rgb(175, 0, 0)`;
      // case 1: return `rgb(0, 175, 0)`;
      // case 2: return `rgb(0, 0, 175)`;
      // case 3: return `rgb(175, 175, 0)`;
      // case 4: return `rgb(175, 0, 175)`;
      // case 5: return `rgb(0, 175, 175)`;
      default: return `rgb(${Math.random() * 175}, ${Math.random() * 175}, ${Math.random() * 175})`;
    }
  }
}
