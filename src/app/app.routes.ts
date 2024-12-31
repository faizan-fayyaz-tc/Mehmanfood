import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OrderComponent } from './pages/order/order.component';
import { ProductComponent } from './pages/product/product.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';

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
    },
    {
        path : 'product',
        component : ProductComponent
    },
    {
        path: 'customer',
        component: CustomerComponent
    },
    {
        path : 'invoice/:orderId',
        component : InvoiceComponent
    }
];
