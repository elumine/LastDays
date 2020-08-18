import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AnalyticsBackendComponent } from './analytics-backend/analytics-backend.component';
import { AnalyticsBuildComponent } from './components/build/analytics-build.component';
import { AnalyticsStatisticComponent } from './components/analytics-statistic/analytics-statistic.component';
import { AnalyticsSessionComponent } from './components/analytics-session/analytics-session.component';


const routes: Routes = [
  { path: 'a', component: AnalyticsBackendComponent },
  { path: '',   redirectTo: '/admin/statistic', pathMatch: 'full' },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'statistic',
        component: AnalyticsStatisticComponent,
        children: [
          {
            path: 'build/:buildId',
            component: AnalyticsBuildComponent,
            children: [
              {
                path: 'session/:sessionId',
                component: AnalyticsSessionComponent
              }
            ]
          }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
