import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsDeviceComponent } from './analytics-device.component';

describe('AnalyticsDeviceComponent', () => {
  let component: AnalyticsDeviceComponent;
  let fixture: ComponentFixture<AnalyticsDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyticsDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
