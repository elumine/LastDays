import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsEventComponent } from './analytics-event.component';

describe('AnalyticsEventComponent', () => {
  let component: AnalyticsEventComponent;
  let fixture: ComponentFixture<AnalyticsEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyticsEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
