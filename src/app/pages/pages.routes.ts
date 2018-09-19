import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/guards/login-guard.guard';



const pagesRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent, data: { titulo: 'TU CUENTA' } },
    { path: 'progress', component: ProgressComponent, data: { titulo: 'PROGRESO' } },
    { path: 'graficas1', component: Graficas1Component, data: { titulo: 'GRAFICAS' } },
    { path: 'promesas', component: PromesasComponent, data: { titulo: 'PROXIMAMENTE' } },
    { path: 'rxjs', component: RxjsComponent, data: { titulo: 'COMPONENTE' } },
    { path: 'account-settings', component: AccoutSettingsComponent, data: { titulo: 'AJUSTES DEL TEMA' } },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
 
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
