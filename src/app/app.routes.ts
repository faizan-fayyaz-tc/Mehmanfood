import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OrderComponent } from './pages/order/order.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo : 'dashboard'
    },
    {
        path: 'dashboard',
        component : DashboardComponent
    },
    {
        path : 'order',
        component: OrderComponent
    }
];
