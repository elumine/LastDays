import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { AnalyticsBackendComponent } from './analytics-backend/analytics-backend.component';
import { HomeComponent } from './home/home.component';
import { environment } from '../environments/environment';
import { AnalyticsStatisticComponent } from './admin/analytics-statistic/analytics-statistic.component';
import { AnalyticsBuildComponent } from './admin/analytics-statistic/analytics-build/analytics-build.component';
import { AnalyticsDeviceComponent } from './admin/analytics-statistic/analytics-build/analytics-device/analytics-device.component';
import { AnalyticsSessionComponent } from './admin/analytics-statistic/analytics-build/analytics-device/analytics-session/analytics-session.component';
import { AnalyticsEventComponent } from './admin/analytics-statistic/analytics-build/analytics-device/analytics-session/analytics-event/analytics-event.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AnalyticsBackendComponent,
    HomeComponent,
    AnalyticsStatisticComponent,
    AnalyticsBuildComponent,
    AnalyticsSessionComponent,
    AnalyticsEventComponent,
    AnalyticsDeviceComponent
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
