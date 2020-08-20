import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { AnalyticsSession } from 'src/app/services/analytics/AnalyticsSession';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import { TimelineCommon } from '../timeline/timeline.component';

export type CalendarDaySelectionEvent = {
  year: number;
  month: number;
  day: number;
}

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnChanges {
  @Input() events: CalendarEventInterface[] = [];
  @Input() selectedDate: CalendarDaySelectionEvent;
  @Output() onEventSelection = new EventEmitter<CalendarEvent>();
  @Output() onDaySelection = new EventEmitter<CalendarDaySelectionEvent>();
  calendar = new Calendar();
  currentSelectedDay: CalendarDay = null;

  constructor(
    public analytics: AnalyticsService) {}

  ngOnInit() {
    console.info('CalendarComponent()', this);
    this.calendar.setEvents(this.events);
    this.setSelectedDate();
  }

  ngOnChanges() {
    this.setSelectedDate();
  }

  setSelectedDate() {
    if (this.selectedDate) {
      if (this.currentSelectedDay) {
        this.currentSelectedDay.isSelected = false;
      }
      this.currentSelectedDay = this.calendar.setSelectedDate(this.selectedDate);
    }
  }

  onDayClick(day: CalendarDay) {
    if (day.events.length > 0) {
      if (this.currentSelectedDay) {
        this.currentSelectedDay.isSelected = false;
      }
      day.isSelected = true;
      this.currentSelectedDay = day;
      this.onDaySelection.emit({
        day: day.day,
        month: day.month.month,
        year: day.month.year.year
      })
    }
  }

  onSessionClick(event: CalendarEvent) {
    this.onEventSelection.emit(event);
  }

  isCalendarEventSelected(event: CalendarEvent) {
    const session = event.initializer as AnalyticsSession;
    return session === this.analytics.currentSession;
  }
}

export interface CalendarEventInterface {
  getCalendarStartTime(): Date;
  getCalendarEndTime(): Date;
  getCalendarLabelText(): string;
  getCalendarSideText(): string;
}

class Calendar {
  events: CalendarEvent[] = [];
  years: CalendarYear[] = [];

  setEvents(events: CalendarEventInterface[]) {
    this.events = events.map(v => new CalendarEvent(v));
    const y2e = new Map<number, CalendarEvent[]>();
    this.events.forEach(e => {
      const y = e.startTime.getFullYear();
      if (!y2e.has(y)) y2e.set(y, []);
      y2e.get(y).push(e);
    });
    for (const y of y2e.keys()) {
      const year = new CalendarYear(y);
      year.setEvents(y2e.get(y));
      this.years.push(year);
    }
  }

  findYear(value: number) {
    return this.years.find(year => year.year === value);
  }

  setSelectedDate(date: CalendarDaySelectionEvent) {
    const { year, month, day } = date;
    if (year > 0 && month > 0 && day > 0) {
      const y = this.findYear(year);
      if (y) {
        const m = y.findMonth(month);
        if (m) {
          const d = m.findDay(day);
          if (d) {
            d.isSelected = true;
            return d;
          }
        }
      }
    }
  }
}

class CalendarYear {
  months: { [key: number]: CalendarMonth } = {};
  events: CalendarEvent[] = [];

  constructor(public year: number) {
    for (let i = 1; i <= 12; i++) {
      this.months[i] = new CalendarMonth(this, i);
    }
  }

  setEvents(events: CalendarEvent[]) {
    this.events = events;
    const m2e = new Map<number, CalendarEvent[]>();
    this.events.forEach(e => {
      const m = e.startTime.getMonth() + 1;
      if (!m2e.has(m)) m2e.set(m, []);
      m2e.get(m).push(e);
    });
    for (const m of m2e.keys()) {
      this.months[m].setEvents(m2e.get(m));
    }
  }

  findMonth(value: number) {
    return this.monthsList.find(month => month.month === value);
  }

  get monthsList() { return Object.values(this.months); }
}

class CalendarMonth {
  days: { [key: number]: CalendarDay } = {};
  events: CalendarEvent[] = [];

  constructor(public year: CalendarYear, public month: number) {
    for (let i = 1; i <= 31; i++) {
      this.days[i] = new CalendarDay(this, i);
    }
  }

  setEvents(events: CalendarEvent[]) {
    this.events = events;
    const d2e = new Map<number, CalendarEvent[]>();
    this.events.forEach(e => {
      const d = e.startTime.getDate();
      if (!d2e.has(d)) d2e.set(d, []);
      d2e.get(d).push(e);
    });
    for (const d of d2e.keys()) {
      this.days[d].setEvents(d2e.get(d));
    }
  }

  findDay(value: number) {
    return this.daysList.find(day => day.day === value);
  }

  get daysList() { return Object.values(this.days); }
}

class CalendarDay {
  events: CalendarEvent[] = [];
  isSelected = false;

  constructor(public month: CalendarMonth, public day: number) {}

  setEvents(events: CalendarEvent[]) {
    this.events = events;
  }
}

export class CalendarEvent {
  startTime: Date;
  endTime: Date;
  calendarLabelText: string;
  calendarSideText: string;
  color = TimelineCommon.GetColorByRow(999);

  constructor(public initializer: CalendarEventInterface) {
    this.startTime = initializer.getCalendarStartTime();
    this.endTime = initializer.getCalendarEndTime();
    this.calendarLabelText = initializer.getCalendarLabelText();
    this.calendarSideText = initializer.getCalendarSideText();
  }

  get duration() {
    return this.endTime.getTime() - this.startTime.getTime();
  }
}
