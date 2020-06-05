import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsStatisticComponent } from './analytics-statistic.component';

describe('AnalyticsStatisticComponent', () => {
  let component: AnalyticsStatisticComponent;
  let fixture: ComponentFixture<AnalyticsStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyticsStatisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
