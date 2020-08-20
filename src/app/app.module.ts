import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { AnalyticsBackendComponent } from './analytics-backend/analytics-backend.component';
import { environment } from '../environments/environment';
import { AnalyticsBuildComponent } from './components/analytics-build/analytics-build.component';
import { AnalyticsStatisticComponent } from './components/analytics-statistic/analytics-statistic.component';
import { AnalyticsSessionComponent } from './components/analytics-session/analytics-session.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { CalendarComponent } from './components/calendar/calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AnalyticsBackendComponent,
    AnalyticsStatisticComponent,
    AnalyticsBuildComponent,
    AnalyticsSessionComponent,
    TimelineComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
