import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsBackendComponent } from './analytics-backend.component';

describe('AnalyticsBackendComponent', () => {
  let component: AnalyticsBackendComponent;
  let fixture: ComponentFixture<AnalyticsBackendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyticsBackendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsBackendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
