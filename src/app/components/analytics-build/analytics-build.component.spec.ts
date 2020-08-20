import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsBuildComponent } from './analytics-build.component';

describe('AnalyticsBuildComponent', () => {
  let component: AnalyticsBuildComponent;
  let fixture: ComponentFixture<AnalyticsBuildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyticsBuildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
