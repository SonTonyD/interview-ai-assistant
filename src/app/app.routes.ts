import { Routes } from '@angular/router';
import { InterviewSimulationPageComponent } from './interview-simulation-page/interview-simulation-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

export const routes: Routes = [
  { path: 'main', component: InterviewSimulationPageComponent },
  { path: 'landing', component: LandingPageComponent },
  { path: '', component: LandingPageComponent },
];
