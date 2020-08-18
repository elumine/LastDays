import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsSessionComponent } from './analytics-session.component';

describe('AnalyticsSessionComponent', () => {
  let component: AnalyticsSessionComponent;
  let fixture: ComponentFixture<AnalyticsSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyticsSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
